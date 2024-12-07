import { Tag } from '@/pages/createQuestion/AddTag';
import axios from 'axios';

export const createTag = async (name: string): Promise<Tag> => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.post(
      `${baseURL}/tags/`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating new tag:', error);
    throw error;
  }
};
