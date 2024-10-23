import React from 'react';

const GroupingControls = ({ setGrouping }) => {
  return (
    <div className="grouping-controls">
      <label>Group by:</label>
      <select onChange={(e) => setGrouping(e.target.value)}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default GroupingControls;
