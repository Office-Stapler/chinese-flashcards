import { vocabList as everyDayList } from "./everyDay";
import { vocabList as faceList } from "./face";
import type { VocabItem } from "./vocab";

export const categoryIds = ["everyDay", "face"] as const;
export type CategoryId = (typeof categoryIds)[number];

export type Category = {
  id: CategoryId;
  title: string;
  description: string;
  count: number;
  list: VocabItem[];
};

export const CATEGORIES: Category[] = [
  {
    id: "everyDay",
    title: "Everyday Words",
    description: "Common vocabulary used in daily life.",
    count: everyDayList.length,
    list: everyDayList,
  },
  {
    id: "face",
    title: "Face",
    description: "Vocabulary related to the face.",
    count: faceList.length,
    list: faceList,
  },
];

export const VOCAB_MAP: Record<CategoryId, VocabItem[]> = Object.fromEntries(
  CATEGORIES.map((category) => [category.id, category.list]),
) as Record<CategoryId, VocabItem[]>;
