const baseURL = import.meta.env.VITE_BASE_URL;

export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
  repeat_password: string;
}) => {
  try {
    const response = await fetch(`${baseURL}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};