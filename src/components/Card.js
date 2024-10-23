import React from 'react';
import '../styles/Card.css';

// Importing priority icons
import urgentPriorityIcon from '../assets/SVG - Urgent Priority colour.svg';
import highPriorityIcon from '../assets/Img - High Priority.svg';
import mediumPriorityIcon from '../assets/Img - Medium Priority.svg';
import lowPriorityIcon from '../assets/Img - Low Priority.svg';
import noPriorityIcon from '../assets/No-priority.svg';

const priorityIcons = {
  4: urgentPriorityIcon,
  3: highPriorityIcon,
  2: mediumPriorityIcon,
  1: lowPriorityIcon,
  0: noPriorityIcon
};

const Card = ({ ticket, getUserNameById }) => {
  if (!ticket) {
    return null; // Guard against undefined tickets
  }

  const priorityIcon = priorityIcons[ticket.priority]; // Get priority icon based on priority level
  const userName = getUserNameById(ticket.userId); // Fetch user name based on userId

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-container">
          <span className="card-id">{ticket.id}</span> {/* Ticket ID */}
          <h4 className="ticket-title">{ticket.title}</h4> {/* Ticket Title */}
        </div>
        <div className="card-avatar">
          {/* Display user name as placeholder for avatar */}
          <div className="user-avatar-placeholder">
            {userName ? userName[0] : 'U'}
          </div>
        </div>
      </div>
      <div className="card-details">
        <div className="priority-icon-container">
          <img src={priorityIcon} alt={`Priority ${ticket.priority}`} className="priority-icon" />
        </div>
        <div className="tag-container">
          {ticket.tag && <span className="card-tag"><div className='card-tag-dot'></div>{ticket.tag[0]}</span>} {/* Tag (like Feature Request) */}
        </div>
      </div>
    </div>
  );
};

export default Card;
