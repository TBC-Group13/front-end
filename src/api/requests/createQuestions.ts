import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const createQuestion = async (
  title: string,
  description: string,
  tags: { id: number; name: string }[],
  accessToken: string | null
) => {
  if (!accessToken) {
    throw new Error('Access token is missing.');
  }

  const tagIds = tags.map((tag) => tag.id);
  const payload = {
    title,
    description,
    tags: tagIds,
  };

  const response = await axios.post(`${baseURL}/questions/`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
