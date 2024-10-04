import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './Game';
import GameRecords from './GameRecords';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/game-records" element={<GameRecords />} />
      </Routes>
    </Router>
  );
};

export default App;
