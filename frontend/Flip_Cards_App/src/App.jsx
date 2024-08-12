
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import FlashcardList from './components/flashcard/FlashcardList';
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
  

  return (
    <Router>
      <div className='bg-sky-300'>
        <Navbar />
        <Routes>
          <Route path="/" element={<FlashcardList  />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
