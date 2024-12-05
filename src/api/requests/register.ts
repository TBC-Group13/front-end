import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
  repeat_password: string;
}) => {
  try {
    const response = await axios.post(`${baseURL}/register/`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};