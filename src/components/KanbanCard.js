import React, { useState } from 'react';
import blankAvatar from '../assets/icons/blank.svg'; // Blank image placeholder
import priority1 from '../assets/icons/HighP.svg';
import priority2 from '../assets/icons/MediumP.svg';
import priority3 from '../assets/icons/LowP.svg';
import priority4 from '../assets/icons/Noprio.svg';
import todoIcon from '../assets/icons/todo.svg'; // Status: Todo
import inProgressIcon from '../assets/icons/inProgress.svg'; // Status: In Progress
import doneIcon from '../assets/icons/done.svg'; // Status: Done
import backlogIcon from '../assets/icons/Backlog.svg'; // Status: Backlog
import cancelledIcon from '../assets/icons/Cancelled.svg'; // Status: Cancelled
import '../styles/kanbanCard.css'; // Custom styles for the card

const KanbanCard = ({ ticket, getUserName, grouping }) => {
  const [isSelected, setIsSelected] = useState(false);

  // Function to handle card selection
  const handleCardClick = () => {
    setIsSelected(!isSelected);
  };

  // Get the priority image based on the ticket priority
  const getPriorityImage = (priority) => {
    switch (priority) {
      case 4:
        return priority4;
      case 3:
        return priority3;
      case 2:
        return priority2;
      case 1:
      default:
        return priority1;
    }
  };

  // Get the status image based on the task status
  const getStatusImage = (status) => {
    switch (status) {
      case 'In progress':
        return inProgressIcon;
      case 'Done':
        return doneIcon;
      case 'Todo':
        return todoIcon;
      case 'Backlog':
        return backlogIcon;
      case 'Cancelled':
        return cancelledIcon;
      default:
        return todoIcon;
    }
  };

  return (
    <div className={`kanban-card ${isSelected ? 'selected' : ''}`} onClick={handleCardClick}>
      <div className="card-header">
        <span className="card-id">{ticket.id}</span>
        {grouping !== 'user' && (
          <div className="user-avatar">
            <img src={blankAvatar} alt="User Avatar" />
          </div>
        )}
      </div>

      {/* Status Icon and Title on the Same Line */}
      <div className="status-title">
        {grouping !== 'status' && (
          <img
            src={getStatusImage(ticket.status)}
            alt={`${ticket.status} Icon`}
            className="status-icon"
          />
        )}
        <h4 className="card-title">{ticket.title}</h4>
      </div>

      {/* Priority Icon, Black Dot, and Feature Request */}
      <div className="tags">
        {grouping !== 'priority' && (
          <div className="priority-icon">
            <img src={getPriorityImage(ticket.priority)} alt={`Priority: ${ticket.priority}`} />
          </div>
        )}
        <span className="tag-box">
          <span className="dot">●</span>
          Feature Request
        </span>
      </div>
    </div>
  );
};

export default KanbanCard;
