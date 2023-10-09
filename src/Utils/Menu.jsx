import React, { useState } from 'react';
import './Menu.css';

const Menu = () => {
  const options = ['All(321)', 'Attendence(10)', 'Exemption(12)', 'Shift(5)', 'Worksheet(6) '];

 
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="menu-container">
      {options.map((option, index) => (
        <div
          key={index}
          className={`menu-option ${selectedOption === option ? 'selected' : ''}`}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default Menu;
