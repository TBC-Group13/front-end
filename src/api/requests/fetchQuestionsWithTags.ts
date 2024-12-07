import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const fetchQuestionsWithTags = async (tags: string[]) => {
  const accessToken = localStorage.getItem('accessToken');
  const tagsQuery = tags.map(tag => `tags=${tag}`).join('&');
  const response = await axios.get(`${baseURL}/questions/?${tagsQuery}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};