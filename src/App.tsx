import { useState, useEffect } from 'react';
import './App.css';
import Flashcard from './components/Flashcard';
import { vocabList } from './data/vocab';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownWords, setKnownWords] = useState<Set<number>>(() => {
    const saved = localStorage.getItem('known-words');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => setIsFlipped(!isFlipped)


  useEffect(() => {
    localStorage.setItem('known-words', JSON.stringify(Array.from(knownWords)));
  }, [knownWords]);

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vocabList.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? vocabList.length - 1 : prevIndex - 1
    );
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

  const currentCard = vocabList[currentIndex];
  const isKnown = knownWords.has(currentIndex);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Chinese Flashcards</h1>
        <p className="subtitle">Master Mandarin one card at a time</p>
        <div className="score-badge">
          Known: {knownWords.size} / {vocabList.length}
        </div>
      </header>

      <main className="card-section">
        <Flashcard item={currentCard} isFlipped={isFlipped} onClick={handleFlip} />

        <button
          className={`mark-btn ${isKnown ? 'known' : ''}`}
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

      <div className="controls">
        <button className="control-btn" onClick={prevCard} aria-label="Previous card">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Prev
        </button>

        <span className="counter">
          {currentIndex + 1} / {vocabList.length}
        </span>

        <button className="control-btn" onClick={nextCard} aria-label="Next card">
          Next
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;
