import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const postAnswer = async (questionId: number, text: string) => {
  const accessToken = localStorage.getItem('accessToken');
  const response = await axios.post(
    `${baseURL}/questions/${questionId}/answers/`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};