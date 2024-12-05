import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${baseURL}/logout/`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};