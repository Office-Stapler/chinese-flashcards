import { HashRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import StudyPage from './pages/StudyPage';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="category/:categoryId" element={<StudyPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
