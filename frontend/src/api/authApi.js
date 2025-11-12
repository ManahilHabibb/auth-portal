import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Send a message to the backend
 * @param {string} message - The message to send
 * @param {string} token - Clerk session token
 * @returns {Promise<{success: boolean, reply: string, timestamp: string}>}
 */
export const sendMessage = async (message, token) => {
  try {
    const response = await axios.post(
      `${API}/messages`,
      { message },
      {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        withCredentials: true
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error(
      error.response?.data?.error || 
      error.message || 
      'Failed to send message. Please try again.'
    );
  }
};

/**
 * Check if backend is healthy
 * @returns {Promise<{status: string, timestamp: string}>}
 */
export const checkHealth = async () => {
  try {
    const response = await axios.get(`${API}/health`, {
      timeout: 3000 // 3 second timeout
    });
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw new Error('Unable to connect to the server. Please try again later.');
  }
};
