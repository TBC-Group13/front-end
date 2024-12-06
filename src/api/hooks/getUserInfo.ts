import axios from 'axios';
import { refreshToken as fetchNewToken } from '../requests/refreshToken';

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

const refreshTokenAndUpdate = async (): Promise<string | null> => {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) {
    console.error('No refresh token available.');
    return null;
  }

  try {
    const { access } = await fetchNewToken(refresh); // არსებული `refreshToken` გამოყენება
    localStorage.setItem('authToken', access);
    return access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

export const fetchUser = async () => {
  let token = localStorage.getItem('authToken');

  if (!token || isTokenExpired(token)) {
    console.log('Token expired or missing. Refreshing...');
    token = await refreshTokenAndUpdate();
  }

  if (!token) {
    throw new Error('No valid token available. Please log in again.');
  }

  // Update headers with the new token
  axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;

  try {
    console.log('Fetching user profile...');
    const userResponse = await axiosInstance.get('/profile/');
    const userId = userResponse.data.id;

    console.log('Fetching user reputation...');
    const reputationResponse = await axiosInstance.get(
      `/users/${userId}/reputation/`
    );

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
