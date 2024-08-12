import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation(); 

  const [flashcards, setFlashcards] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });
  const [editMode, setEditMode] = useState(false);
  const [editCardId, setEditCardId] = useState(null);

  useEffect(() => {
    const fetchAllCards = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/get-all-cards");
        setFlashcards(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCards();
  }, []);

  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:3000/api/edit-card/${editCardId}`, newCard);
        setFlashcards(flashcards.map(card => card.id === editCardId ? { ...card, Questions: newCard.question, Answers: newCard.answer } : card));
        setEditMode(false);
        setEditCardId(null);
      } else {
        await axios.post("http://localhost:3000/api/add-card", newCard);
        window.location.reload();
      }
      setNewCard({ question: '', answer: '' });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (card) => {
    setEditMode(true);
    setEditCardId(card.id);
    setNewCard({ question: card.Questions, answer: card.Answers });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/delete-card/${id}`);
      setFlashcards(flashcards.filter(card => card.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className='bg-gray-300 flex justify p-4 items-center flex-wrap ps-10'>
      <input 
        type="text" 
        required
        className='m-3 border-b-2 border-zinc-500 bg-transparent cursor-pointer'
        placeholder="Question" 

        value={newCard.question}
        onChange={e => setNewCard({ ...newCard, question: e.target.value })} 
      />
      <input 
        type="text" 
        className='m-3 bg-transparent cursor-auto border-b-2 border-zinc-500  '
        required
        placeholder="Answer" 
        value={newCard.answer}
        onChange={e => setNewCard({ ...newCard, answer: e.target.value })} 
      />
      <button className='m-3' onClick={handleAddFlashcard}>
        {editMode ? "Make Changes" : "Add Flashcard"}
      </button>
      </div>
      <div className='flex flex-wrap justify-between bg-slate-200 p-4'>
  {flashcards.map((card, index) => (
    <div key={index} className='w-full sm:w-[48%] lg:w-[30%] bg-white p-4 m-2 border rounded-lg'>
      <h3 className=' text-lg font-semibold mb-2'>{card.Questions}</h3>
      <p className='mb-4'>{card.Answers}</p>
      <button onClick={() => handleEdit(card)} className='text-white mr-2'>Edit</button>
      <button onClick={() => handleDelete(card.id)} className='text-white'>Delete</button>
    </div>
  ))}
</div>

    </div>
  );
};

export default Dashboard;
