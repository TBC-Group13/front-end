import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const updateProfileInfo = async (
  token: string,
  newUsername: string,
  newEmail: string,
  newPassword: string,
  newProfilePhoto: File | null
) => {
  const formData = new FormData();

  if (newUsername) formData.append('username', newUsername);
  if (newEmail) formData.append('email', newEmail);
  if (newPassword) formData.append('password', newPassword);
  if (newProfilePhoto) formData.append('profilePhoto', newProfilePhoto);

  try {
    const response = await axios.patch(`${baseURL}/user/settings/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error('Failed to update profile');
  }
};
