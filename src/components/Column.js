import React from 'react';
import Card from './Card';
import '../styles/Column.css';

// Importing priority and status icons
import urgentPriorityIcon from '../assets/SVG - Urgent Priority colour.svg';
import highPriorityIcon from '../assets/Img - High Priority.svg';
import mediumPriorityIcon from '../assets/Img - Medium Priority.svg';
import lowPriorityIcon from '../assets/Img - Low Priority.svg';
import noPriorityIcon from '../assets/No-priority.svg';

import todoIcon from '../assets/To-do.svg';
import inProgressIcon from '../assets/in-progress.svg';
import doneIcon from '../assets/Done.svg';
import backlogIcon from '../assets/Backlog.svg';
import cancelledIcon from '../assets/Cancelled.svg';

// Importing additional icons
import userIcon from '../assets/user-icon.svg'; // Placeholder for user icon
import addIcon from '../assets/add.svg';
import menuIcon from '../assets/3 dot menu.svg';

// Icons for priority and status
const priorityIcons = {
  'Urgent': urgentPriorityIcon,
  'High': highPriorityIcon,
  'Medium': mediumPriorityIcon,
  'Low': lowPriorityIcon,
  'No Priority': noPriorityIcon
};

const statusIcons = {
  'Todo': todoIcon,
  'In progress': inProgressIcon,
  'Done': doneIcon,
  'Backlog': backlogIcon,
  'Cancelled': cancelledIcon
};

const Column = ({ title, tickets, groupBy, getUserNameById }) => {
  // Determine which icon to show based on the current grouping
  const getIconForTitle = () => {
    if (groupBy === 'status') {
      return statusIcons[title] || null;  // Use status icons if grouped by status
    } else if (groupBy === 'priority') {
      return priorityIcons[title] || null;  // Use priority icons if grouped by priority
    } else if (groupBy === 'user') {
      return userIcon;  // Use user icon if grouped by user
    }
    return null;
  };

  const icon = getIconForTitle();

  return (
    <div className="column">
      <div className="column-header">
        <h3>
          {icon && <img src={icon} alt={title} className="status-icon" />} {/* Render icon if available */}
          {title}
        </h3>
        <div className="column-actions">
          <img src={addIcon} alt="Add" className="action-icon" />
          <img src={menuIcon} alt="Menu" className="action-icon" />
        </div>
      </div>
      {tickets.map(ticket => (
        <Card key={ticket.id} ticket={ticket} getUserNameById={getUserNameById} />
      ))}
    </div>
  );
};

export default Column;
