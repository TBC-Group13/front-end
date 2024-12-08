import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const deleteUserProfile = async (token: string) => {
  try {
    const response = await axios.delete(`${baseURL}/user/settings/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to delete user profile:', error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error('Failed to delete user profile:', error.message);
    } else {
      console.error('Failed to delete user profile:', String(error));
    }
    throw error;
  }
};