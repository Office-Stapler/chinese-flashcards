import type { VocabItem } from "../data/vocab";

export type Box = 0 | 1 | 2 | 3 | 4;

export interface WordProgress {
  box: Box;
  nextReview: number; // timestamp
}

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

export const ProgressService = {
  loadProgress(): ProgressMap {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  },

  saveProgress(progress: ProgressMap) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  },

  getWordProgress(progress: ProgressMap, wordId: string): WordProgress {
    return progress[wordId] || { box: 0, nextReview: 0 };
  },

  updateProgress(progress: ProgressMap, wordId: string, isCorrect: boolean): ProgressMap {
    const current = this.getWordProgress(progress, wordId);
    let newBox: Box = current.box;

    if (isCorrect) {
      newBox = Math.min(current.box + 1, 4) as Box;
    } else {
      newBox = 0;
    }

    // Calculate next review time
    // If correct, add interval. If incorrect, reset to now? Or reset to tomorrow?
    // Usually incorrect means "learn again now" or "tomorrow". Let's say due immediately or very soon.
    // For simplicity:
    // Correct -> Now + Interval
    // Incorrect -> Now (reset execution)

    const now = Date.now();
    const intervalDays = isCorrect ? INTERVALS[newBox] : 0;
    const nextReview = now + intervalDays * 24 * 60 * 60 * 1000;

    const newProgress = {
      ...progress,
      [wordId]: {
        box: newBox,
        nextReview,
      },
    };

    this.saveProgress(newProgress);
    return newProgress;
  },

  getDueWords(allWords: VocabItem[], limit?: number): VocabItem[] {
    const progress = this.loadProgress();
    const now = Date.now();

    // Filter words that are due or new (never seen)
    const dueWords = allWords.filter((word) => {
      const wordProgress = progress[word.chinese]; // Using chinese char as ID
      // If never seen (undefined), it is "due" (available to learn)
      // If seen, check if nextReview <= now
      if (!wordProgress) return true;
      return wordProgress.nextReview <= now;
    });

    // Shuffle
    const shuffled = dueWords.sort(() => 0.5 - Math.random());

    if (limit) {
      return shuffled.slice(0, limit);
    }
    return shuffled;
  },
};
