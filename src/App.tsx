import './App.css';
import CardList from './components/CardList';
import { vocabList } from './data/everyDay';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Chinese Flashcards</h1>
        <p className="subtitle">Master Mandarin one card at a time</p>
      </header>

      <CardList data={vocabList} id="default" />
    </div>
  );
}

export default App;
