import { HashRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import StudyPage from "./pages/StudyPage";
import TestPage from "./pages/TestPage";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index={true} element={<Home />} />
          <Route path="category/:categoryId" element={<StudyPage />} />
          <Route path="test/:categoryId" element={<TestPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
