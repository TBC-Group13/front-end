import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const markAnswerCorrect = async (answerId: number) => {
  const accessToken = localStorage.getItem('accessToken');
  const response = await axios.post(
    `${baseURL}/answers/${answerId}/mark-correct/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};