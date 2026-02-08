import { useEffect, useState } from 'react';
import Flashcard from './Flashcard';
import type { VocabItem } from '../data/vocab';
import { useLocalStorage } from '../hooks/useLocalStorage';
import styles from './CardList.module.css';
import classNames from 'classnames';

interface CardListProps {
  data: VocabItem[];
  id: string;
}

const CardList = ({ data, id }: CardListProps) => {
  const { setValue: setLocalCurrIndex, value: localCurrIndex } = useLocalStorage<number>(`current-index-${id}`, 0);
  const [currentIndex, setCurrentIndex] = useState(localCurrIndex);

  const { setValue: setLocalKnownWords, value: localKnownWords } = useLocalStorage<number[]>(`known-words-${id}`, []);
  const [knownWords, setKnownWords] = useState<Set<number>>(new Set(localKnownWords));

  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => setIsFlipped(!isFlipped);

  useEffect(() => {
    setLocalKnownWords(Array.from(knownWords));
  }, [knownWords, setLocalKnownWords]);

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % data.length;
      setLocalCurrIndex(newIndex);
      return newIndex;
    });
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? data.length - 1 : prevIndex - 1;
      setLocalCurrIndex(newIndex);
      return newIndex;
    });
  };

  const toggleKnown = () => {
    setKnownWords((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentIndex)) {
        newSet.delete(currentIndex);
      } else {
        newSet.add(currentIndex);
      }
      return newSet;
    });
  };

  if (!data || data.length === 0) {
    return <div className={styles.emptyState}>No vocabulary available.</div>;
  }

  const currentCard = data[currentIndex];
  // Safety check in case index is out of bounds
  if (!currentCard) return null;

  const isKnown = knownWords.has(currentIndex);

  return (
    <div className={styles.cardListContainer}>
      <div className={styles.listHeader}>
        <div className={styles.scoreBadge}>
          Known: {knownWords.size} / {data.length}
        </div>
      </div>

      <main className={styles.cardSection}>
        <Flashcard item={currentCard} isFlipped={isFlipped} onClick={handleFlip} />

        <button
          className={classNames({
            [styles.markBtn]: true,
            [styles.known]: isKnown
          })}
          onClick={toggleKnown}
          aria-label={isKnown ? "Mark as unknown" : "Mark as known"}
        >
          {isKnown ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Mastered
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              Mark as Known
            </>
          )}
        </button>
      </main>

      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={prevCard} aria-label="Previous card">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Prev
        </button>

        <span className={styles.counter}>
          {currentIndex + 1} / {data.length}
        </span>

        <button className={styles.controlBtn} onClick={nextCard} aria-label="Next card">
          Next
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardList;
