import { Tag } from '@/pages/createQuestion/AddTag';
import axios from 'axios';

export const fetchTags = async (
  baseURL: string,
  accessToken: string
): Promise<Tag[]> => {
  const response = await axios.get(`${baseURL}/tags/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
