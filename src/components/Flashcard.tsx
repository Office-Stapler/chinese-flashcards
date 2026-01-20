import React, { useEffect, useState } from 'react';
import type { VocabItem } from '../data/vocab';
import './Flashcard.css';

interface FlashcardProps {
  item: VocabItem;
  onClick?: () => void;
  isFlipped?: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({ item, isFlipped: propIsFlipped, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(propIsFlipped ?? false);

  useEffect(() => {
    setIsFlipped(propIsFlipped ?? false);
  }, [propIsFlipped, setIsFlipped])


  const handleFlip = () => {
    if (onClick) {
      return onClick?.();
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flashcard-container ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <div className="card-content">
            <h2 className="chinese-text">{item.chinese}</h2>
            <p className="hint-text">Tap to reveal</p>
          </div>
        </div>
        <div className="flashcard-back">
          <div className="card-content">
            <h2 className="chinese-text-small">{item.chinese}</h2>
            <p className="pinyin-text">{item.pinyin}</p>
            <h3 className="english-meaning">{item.english_meaning}</h3>

            <div className="example-section">
              <p className="example-cn">{item.example}</p>
              <p className="example-pinyin">{item.example_pinyin}</p>
              <p className="example-en">{item.example_meaning}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
