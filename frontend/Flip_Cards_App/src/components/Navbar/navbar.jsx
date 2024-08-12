import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 mb-0" >
      <div className="flex justify items-center">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? "text-white text-lg underline" : "text-white text-lg"
          }
        >
          FLASHCARDS
        </NavLink>
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => 
            isActive ? "text-white text-lg underline" : "text-white text-lg"
          }
        >
          DASHBOARD
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
