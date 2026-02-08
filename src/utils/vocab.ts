import { categoryIds } from "../data/category_maps";
import type { CategoryId } from "../data/category_maps";

export function stringToCategoryId(s?: string): CategoryId | undefined {
  if (s && categoryIds.includes(s as CategoryId)) {
    return s as CategoryId;
  }
  return undefined;
}
