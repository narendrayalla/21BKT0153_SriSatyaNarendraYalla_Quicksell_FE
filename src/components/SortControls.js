import React from 'react';

const SortControls = ({ setSortOption }) => {
  return (
    <div className="sort-controls">
      <label>Sort by:</label>
      <select onChange={(e) => setSortOption(e.target.value)}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortControls;
