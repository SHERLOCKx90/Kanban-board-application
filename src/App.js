import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import fetchTickets from './services/api.js';
import Column from './components/Column.js';

const App = () => {
  const [tickets, setTickets] = useState(null); // Initially set to null for loading state
  const [users, setUsers] = useState([]); // State to hold user data
  const [loading, setLoading] = useState(true); // Loading state
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');

  // Fetch the tickets and users from the API
  useEffect(() => {
    const getTicketsAndUsers = async () => {
      const data = await fetchTickets(); // Assume this returns both tickets and users
      const { tickets, users } = data;
      setTickets(tickets);
      setUsers(users);
      setLoading(false); // Set loading to false once data is fetched
    };
    getTicketsAndUsers();
  }, []);

  // Store user preferences in localStorage
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  // Helper function to get the user name by userId
  const getUserNameById = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unassigned';
  };

  // Group tickets based on the selected option
  const groupTickets = () => {
    if (!tickets) return [];

    if (groupBy === 'user') {
      return groupByUser();
    } else if (groupBy === 'priority') {
      return groupByPriority();
    } else {
      return groupByStatus();
    }
  };

  // Group tickets by priority and order them correctly
  const groupByPriority = () => {
    const priorityOrder = ['Urgent', 'High', 'Medium', 'Low', 'No Priority'];

    const grouped = tickets.reduce((acc, ticket) => {
      const priority = getPriorityLabel(ticket.priority);
      if (!acc[priority]) {
        acc[priority] = [];
      }
      acc[priority].push(ticket);
      return acc;
    }, {});

    // Sort the grouped tickets based on the correct priority order
    return priorityOrder
      .map(priority => [priority, grouped[priority] || []]) // Map each priority to its tickets, if no tickets, use an empty array
      .filter(([priority, tickets]) => tickets.length > 0); // Filter out any priorities with no tickets
  };

  // Group tickets by user
  const groupByUser = () => {
    const grouped = tickets.reduce((acc, ticket) => {
      const userName = getUserNameById(ticket.userId);
      if (!acc[userName]) {
        acc[userName] = [];
      }
      acc[userName].push(ticket);
      return acc;
    }, {});
    return Object.entries(grouped);
  };

  // Group tickets by status
  const groupByStatus = () => {
    const grouped = tickets.reduce((acc, ticket) => {
      const status = ticket.status || 'Unknown';
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(ticket);
      return acc;
    }, {});
    return Object.entries(grouped); // Return grouped tickets as array of arrays
  };

  // Helper function to convert priority number to its corresponding label
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4: return 'Urgent';
      case 3: return 'High';
      case 2: return 'Medium';
      case 1: return 'Low';
      default: return 'No Priority';
    }
  };

  // Sort tickets based on user selection
  const sortedTickets = () => {
    if (!tickets || tickets.length === 0) return []; // Safeguard: Return empty array if no tickets

    return [...tickets].sort((a, b) => {
      if (sortBy === 'priority') {
        // Custom priority sorting order: Urgent (4), High (3), Medium (2), Low (1), No Priority (0)
        const priorityOrder = [0, 4, 3, 2, 1];
        return priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority);
      } else if (sortBy === 'title') {
        // Sort by title alphabetically (A-Z)
        return a.title.localeCompare(b.title);
      }
      return 0; // Default case: no sorting
    });
  };

  // Get the grouped tickets
  const groupedTickets = groupTickets(sortedTickets());

  // Handle loading state
  if (loading) {
    return <p>Loading tickets...</p>;
  }

  // Handle case when no tickets are available
  if (!tickets || tickets.length === 0) {
    return <p>No tickets available</p>;
  }

  return (
    <div className='app'>
      <NavBar setGroupBy={setGroupBy} setSortBy={setSortBy} />
      <div className='board'>
        {
          Array.isArray(groupedTickets) && groupedTickets.length > 0 ? (
            groupedTickets.map(([group, tickets]) => (
              <Column key={group}
                title={group}
                tickets={tickets}
                groupBy={groupBy}
                getUserNameById={getUserNameById}
              />))
          ) :
            (
              <p>No group tickets available</p>
            )
        }
      </div>
    </div>
  );
}

export default App;
