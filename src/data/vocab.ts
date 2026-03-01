export type VocabItem = {
  chinese: string;
  pinyin: string;
  english_meaning: string;
  example: string;
  example_pinyin: string;
  example_meaning: string;
} | {
  chinese: string;
  pinyin: string;
  english_meaning: string;
  example: null | undefined;
}
