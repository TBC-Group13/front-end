import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const deleteProfileUser = async (token: string): Promise<void> => {
  try {
    const response = await axios.delete(`${baseURL}/users/delete/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Profile deleted successfully:', response.data);
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw new Error('Failed to delete profile');
  }
};
