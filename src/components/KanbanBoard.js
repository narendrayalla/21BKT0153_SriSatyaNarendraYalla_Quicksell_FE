import React, { useState, useEffect } from 'react';
import { getTickets } from '../services/api';
import DropdownMenu from './DropdownMenu';
import KanbanCard from './KanbanCard';
import '../styles/style.css';
import add from '../assets/icons/add.svg';
import dots from '../assets/icons/3dot.svg';
import urgentN from '../assets/icons/urgentN.svg';
import highIcon from '../assets/icons/HighP.svg';
import mediumIcon from '../assets/icons/MediumP.svg';
import lowIcon from '../assets/icons/LowP.svg';
import noPriorityIcon from '../assets/icons/Noprio.svg';
import blankUserIcon from '../assets/icons/blank.svg'; // Example user icon
import todoIcon from '../assets/icons/todo.svg';
import inProgressIcon from '../assets/icons/inProgress.svg';
import doneIcon from '../assets/icons/done.svg'; // Using "Done" instead of "Completed"
import backlogIcon from '../assets/icons/Backlog.svg';
import cancelledIcon from '../assets/icons/Cancelled.svg';
import RecruiterModal from './RecruiterModal'; // Import the modal component

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sortOption, setSortOption] = useState('priority');
  const [showModal, setShowModal] = useState(false); // New state for controlling the modal

  // Fetch tickets and users
  useEffect(() => {
    const fetchTickets = async () => {
      const { tickets, users } = await getTickets();
      setTickets(tickets);
      setUsers(users);
    };

    fetchTickets();
  }, []);

  // Get the user name by ID
  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  // Open modal
  const handleOpenModal = () => {
    setShowModal(true);
    document.body.classList.add('modal-open'); // Add class to dim background
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    document.body.classList.remove('modal-open'); // Remove class when modal is closed
  };

  // Group tickets by status, user, or priority
  const groupTickets = (tickets, grouping) => {
    if (!Array.isArray(tickets)) return {};

    const groupedTickets = tickets.reduce((groups, ticket) => {
      switch (grouping) {
        case 'status': {
          const status = ticket.status || 'No Status';
          if (!groups[status]) groups[status] = [];
          groups[status].push(ticket);
          break;
        }
        case 'user': {
          const user = getUserName(ticket.userId) || 'Unassigned';
          if (!groups[user]) groups[user] = [];
          groups[user].push(ticket);
          break;
        }
        case 'priority': {
          const priority = ticket.priority || 0;
          const priorityName = getPriorityLabel(priority); // Get the priority label
          if (!groups[priorityName]) groups[priorityName] = [];
          groups[priorityName].push(ticket);
          break;
        }
        default:
          return tickets;
      }
      return groups;
    }, {});

    // Add empty columns for statuses that have no tickets
    if (grouping === 'status') {
      const allStatuses = ['Todo', 'In progress', 'Backlog', 'Done', 'Cancelled'];
      allStatuses.forEach((status) => {
        if (!groupedTickets[status]) {
          groupedTickets[status] = []; // Add an empty column for statuses without tickets
        }
      });
    }

    return groupedTickets;
  };

  // Get icons based on grouping type (priority, user, or status)
  const getGroupIcon = (group, grouping) => {
    switch (grouping) {
      case 'priority':
        return getPriorityIcon(group);
      case 'user':
        return getUserIcon(group);
      case 'status':
        return getStatusIcon(group);
      default:
        return null;
    }
  };

  // Get priority label based on priority number
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4:
        return 'Urgent';
      case 3:
        return 'High';
      case 2:
        return 'Medium';
      case 1:
      default:
        return 'Low';
    }
  };

  // Get priority icon based on priority name
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'Urgent':
        return urgentN;
      case 'High':
        return highIcon;
      case 'Medium':
        return mediumIcon;
      case 'Low':
      default:
        return lowIcon;
    }
  };

  // Get status icon based on status name
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Todo':
        return todoIcon;
      case 'In progress':
        return inProgressIcon;
      case 'Done':
        return doneIcon;
      case 'Backlog':
        return backlogIcon;
      case 'Cancelled':
        return cancelledIcon;
      default:
        return todoIcon;
    }
  };

  // Get user icon (assuming all users have the same blank avatar)
  const getUserIcon = (user) => {
    return blankUserIcon;
  };

  // Sort tickets based on sortOption
  const sortTickets = (tickets, sortOption) => {
    if (!Array.isArray(tickets)) return [];

    return tickets.sort((a, b) => {
      if (sortOption === 'priority') {
        return a.priority - b.priority; // Sort by priority in ascending order
      } else {
        return a.title.localeCompare(b.title); // Sort alphabetically by title
      }
    });
  };

  const groupedTickets = groupTickets(tickets, grouping);

  return (
    <div>
      <DropdownMenu setGrouping={setGrouping} setSortOption={setSortOption} />
      <div className="kanban-board">
        {Object.entries(groupedTickets).map(([group, tickets]) => (
          <div key={group} className="kanban-column">
            <div className="kanban-column-header">
              {/* Icon for Priority, User, or Status based on current grouping */}
              <img
                src={getGroupIcon(group, grouping)}
                alt={group}
                className="icon group-icon"
              />

              {/* Group Title and Count */}
              <h3>{group}</h3>
              <span>({tickets.length})</span>

              {/* Icons */}
              <img src={add} alt="plus" className="icon plus-icon" />
              <img src={dots} alt="dots" className="icon dots-icon" />
            </div>

            {/* Render Cards */}
            {tickets.length === 0 ? (
              <div className="no-tickets">No tickets available</div>
            ) : (
              sortTickets(tickets, sortOption).map((ticket) => (
                <KanbanCard key={ticket.id} ticket={ticket} getUserName={getUserName} grouping={grouping} />
              ))
            )}
          </div>
        ))}
      </div>

      {/* Recruiter Mode Button */}
      <button onClick={handleOpenModal} className="recruiter-mode">
        👀 Recruiter Mode
      </button>

      {/* Recruiter Modal */}
      {showModal && <RecruiterModal onClose={handleCloseModal} />}
    </div>
  );
};

export default KanbanBoard;
