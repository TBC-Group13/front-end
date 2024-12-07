import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const fetchQuestions = async () => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    throw new Error('No access token found');
  }

  try {
    const response = await axios.get(`${baseURL}/questions/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      console.error('Unauthorized: Invalid or expired token');
    }
    throw error;
  }
};