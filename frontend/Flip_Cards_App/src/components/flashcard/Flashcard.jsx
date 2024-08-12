import React, { useState } from 'react';


const Flashcard = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className="card-scene"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`flashcard card ${flipped ? 'card--flipped' : ''}`}>
        <div className="card-face card-front flex-col ">
        
          <p className="text-center text-3xl font-semibold text-[white]">
            {question}
          </p>
          <div className='mt-4 text-[#272727]' >Click Here to Reveal Answer..</div>
        </div>
        <div className="card-face card-back flex-col">
          <p className="text-center text-3xl font-semibold text-[white]">
            {answer}
          </p>
          <div className='mt-4 text-[#bcbaba]'>Click Here to go to question..</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
