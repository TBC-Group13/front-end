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
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    return null;
  }
};

export const fetchQuestions = async () => {
    let token = localStorage.getItem('authToken');
   
    if (!token || isTokenExpired(token)) {
      console.log('Token expired or missing. Refreshing...');
      token = await refreshToken();
    }
   
    if (!token) {
      throw new Error('No valid token available. Please log in again.');
    }
   
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
   
    try {
      console.log('Sending request to /questions/ endpoint');
      const questionsResponse = await axiosInstance.get('/questions/');
      console.log('Questions response:', questionsResponse);
   
      return questionsResponse.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  };