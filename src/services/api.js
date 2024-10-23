import axios from 'axios';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

export const getTickets = async () => {
  try {
    const response = await axios.get(API_URL);
    // Access the tickets and users from the response
    return {
      tickets: response.data.tickets || [],
      users: response.data.users || [],
    };
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return { tickets: [], users: [] };
  }
};
