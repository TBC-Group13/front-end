import axios from 'axios';

export const getSingleQuestion = async (id: string | number) => {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('Access token is missing.');
    }

    const response = await axios.get(
      `${baseURL}/questions/${id}/list-answers/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch the single question:', error);
    throw error;
  }
};
