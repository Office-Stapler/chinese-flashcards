import type { VocabItem } from "../data/vocab";

// Box is the Spaced Repetition System (SRS) level
// 0: Just learned (reset)
// 1: 1 day
// 2: 3 days
// 3: 7 days
// 4: 14 days
export type Box = 0 | 1 | 2 | 3 | 4;

export interface WordProgress {
  box: Box;
  nextReview: number; // timestamp
}

// Progress Map where the 
export type ProgressMap = Record<string, WordProgress>;

const STORAGE_KEY = "chinese_flashcards_progress";

// Intervals in days for each box: 0 (just learned) -> 1 day -> 3 days -> 7 days -> 14 days -> 30 days
const INTERVALS: Record<Box, number> = {
  0: 0.5, // 12 hours for wrong/new items to be retested sooner? Or just 1 day. Let's say 0 means "reset".
  1: 1,
  2: 3,
  3: 7,
  4: 14,
};

export class ProgressProvider {
  private progress: ProgressMap;

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY);
    this.progress = stored ? JSON.parse(stored) : {};
  }

  getWordProgress(wordId: string): WordProgress {
    return this.progress[wordId] || { box: 0, nextReview: 0 };
  }

  updateProgress(wordId: string, isCorrect: boolean): ProgressMap {
    const current = this.getWordProgress(wordId);
    const nextBox = getNextBoxLevel(current.box, isCorrect);

    // Calculate next review time
    // If correct, add interval. If incorrect, reset to now? Or reset to tomorrow?
    // Usually incorrect means "learn again now" or "tomorrow". Let's say due immediately or very soon.
    // For simplicity:
    // Correct -> Now + Interval
    // Incorrect -> Now (reset execution)

    const now = Date.now();
    const intervalDays = isCorrect ? INTERVALS[nextBox] : 0;
    const intervalMs = intervalDays * 24 * 60 * 60 * 1000;

    const nextReview = now + intervalMs;

    const newProgress = {
      ...this.progress,
      [wordId]: {
        box: nextBox,
        nextReview,
      },
    };

    this.saveProgress(newProgress);
    return newProgress;
  }

  saveProgress(progress: ProgressMap) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    this.progress = progress;
  }

  getDueWords(allWords: VocabItem[], limit?: number): VocabItem[] {
    const now = Date.now();
    // Filter words that are due or new (never seen)
    const dueWords = allWords
      .filter((word) => {
        const wordProgress = this.progress[word.chinese];
        return !wordProgress || wordProgress.nextReview <= now;
      })
      // shuffle the words
      .sort(() => 0.5 - Math.random());
    return dueWords.slice(0, limit);
  }

}

function getNextBoxLevel(currentBox: Box, isCorrect: boolean): Box {
  if (isCorrect) {
    return Math.min(currentBox + 1, 4) as Box;
  }
  return 0;
}
