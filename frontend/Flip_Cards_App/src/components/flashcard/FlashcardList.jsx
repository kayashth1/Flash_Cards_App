// src/components/FlashcardList.js
import React, { useEffect, useState } from 'react';
import Flashcard from '../flashcard/Flashcard';
import axios from 'axios';

const FlashcardList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState([]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  useEffect(() => {
    const fetchAllCards = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/get-all-cards");
        console.log(response);
        setCards(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCards();
  }, []);

  return (
    <div className="flashcard-list h-[100vh]">
      <div className='text-2xl font-bold uppercase mb-3' >Flashcard questionnaire Game !</div>
     
      {cards.length > 0 && (
        <Flashcard
          question={cards[currentIndex].Questions} 
          answer={cards[currentIndex].Answers}     
        />
      )}
      <div className="navigation-buttons ">
        <button className='w-[120px] h-[40px]' onClick={handlePrevious}>Previous</button>
        <button className='w-[120px] h-[40px]'  onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default FlashcardList;
