import React, { useState } from "react";
import { Card } from "antd";
import type { VocabItem } from "../data/vocab";
import styles from "./Flashcard.module.css";
import classnames from "classnames";

interface FlashcardProps {
  item: VocabItem;
  onClick?: () => void;
  isFlipped?: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({ item, isFlipped: propIsFlipped, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(propIsFlipped ?? false);

  const handleFlip = () => {
    if (onClick) {
      return onClick?.();
    }
    setIsFlipped((isFlipped) => !isFlipped);
  };

  const currIsFlipped = propIsFlipped ?? isFlipped;
  return (
    <div className={classnames(styles.flashcardContainer, { [styles.flipped]: currIsFlipped })} onClick={handleFlip}>
      <div className={styles.flashcardInner}>
        <Card className={styles.flashcard} variant="outlined" hoverable={false}>
          <div className={styles.cardContent}>
            <h2 className={styles.chineseText}>{item.chinese}</h2>
            <p className={styles.hintText}>Tap to reveal</p>
          </div>
        </Card>
        <Card
          className={classnames({
            [styles.flashcard]: true,
            [styles.flippedBack]: true,
          })}
          variant="outlined"
          hoverable={false}
        >
          <div className={styles.cardContent}>
            <h2 className={styles.chineseTextSmall}>{item.chinese}</h2>
            <p className={styles.pinyinText}>{item.pinyin}</p>
            <h3 className={styles.englishMeaning}>{item.english_meaning}</h3>

            <div className={styles.exampleSection}>
              <p className={styles.exampleCn}>{item.example}</p>
              <p className={styles.examplePinyin}>{item.example_pinyin}</p>
              <p className={styles.exampleEnglish}>{item.example_meaning}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Flashcard;
