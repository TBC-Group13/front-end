import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const fetchQuestions = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const response = await axios.get(`${baseURL}/questions/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};