// src/components/DropdownMenu.js
import React, { useState } from 'react';
import display from '../assets/icons/Display.svg';
import down from '../assets/icons/down.svg';
import '../styles/dropdownMenu.css'; // CSS file for the styles

const DropdownMenu = ({ setGrouping, setSortOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Conditionally apply grey background when dropdown is open */}
      {isOpen && <div className="dropdown-overlay" />} {/* Full-screen grey overlay */}

      <div className="dropdown-container">
        <button className="dropdown-button" onClick={toggleDropdown}>
          <img src={display} alt="Display" /> Display
          <img src={down} alt="Toggle Dropdown" />
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-group">
              <label htmlFor="grouping">Grouping</label>
              <select id="grouping" onChange={(e) => setGrouping(e.target.value)}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div className="dropdown-group">
              <label htmlFor="ordering">Ordering</label>
              <select id="ordering" onChange={(e) => setSortOption(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
