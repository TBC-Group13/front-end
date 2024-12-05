import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const loginUser = async (userData: {
  identifier: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${baseURL}/login/`, userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};