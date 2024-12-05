import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${baseURL}/token/refresh/`, {
      refresh: refreshToken,
    });

    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};