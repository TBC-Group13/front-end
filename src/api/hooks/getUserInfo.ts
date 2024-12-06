import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {},
});

const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Invalid token:', error);
    return true;
  }
};

const refreshToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post(`${baseURL}/token/refresh/`, {
      refresh: localStorage.getItem('refreshToken'),
    });
    localStorage.setItem('authToken', response.data.access);
    return response.data.access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

export const fetchUser = async () => {
  let token = localStorage.getItem('authToken');

  if (!token || isTokenExpired(token)) {
    console.log('Token expired or missing. Refreshing...');
    token = await refreshToken();
  }

  if (!token) {
    throw new Error('No valid token available. Please log in again.');
  }

  // Update headers with the new token
  axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;

  try {
    console.log('Sending request to /profile/ endpoint');
    const userResponse = await axiosInstance.get('/profile/');
    console.log('User response:', userResponse);

    const userId = userResponse.data.id;

    console.log('Sending request to reputation endpoint');
    const reputationResponse = await axios.get(
      `${baseURL}/users/${userId}/reputation/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log('Reputation response:', reputationResponse);

    const profilePhoto =
      reputationResponse.data.profile_photo || '/icons/profilePhoto.svg';

    return {
      ...userResponse.data,
      reputation: reputationResponse.data.reputation,
      answers_count: reputationResponse.data.answers_count,
      profile_photo: profilePhoto,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
