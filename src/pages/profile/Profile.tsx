import { fetchUser } from '@/api/requests/getUserInfo';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { deleteProfileUser } from '@/api/requests/deleteProfileUser';

export default function Profile() {
  const token = localStorage.getItem('accesToken');
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [reputation, setReputation] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<number | null>(
    null
  );
  const [profilePhoto, setProfilePhoto] = useState<string>(
    '/icons/profilePhoto.svg'
  );
  const [, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null>(null);

  const [newUsername, setNewUsername] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newProfilePhoto, setNewProfilePhoto] = useState<File | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUser();

        console.log(userData);
        setUsername(userData.username);
        setEmail(userData.email);
        setReputation(userData.reputation);
        setAnsweredQuestions(userData.answers_count);
        setProfilePhoto(userData.profile_photo || '/icons/profilePhoto.svg');
      } catch (error) {
        console.log(error);
        setError('Failed to load user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  const handleProfilePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNewProfilePhoto(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setProfilePhoto(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (newUsername) formData.append('username', newUsername);
    if (newEmail) formData.append('email', newEmail);
    if (newPassword) formData.append('password', newPassword);
    if (newProfilePhoto) formData.append('profilePhoto', newProfilePhoto);

    try {
      const response = await axios.patch(
        `${baseURL}/user/settings/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Successfully updated the profile:', response);

      // ახალი მონაცემების წამოყვანა
      const updatedUserData = await axios.get(`${baseURL}/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsername(updatedUserData.data.username);
      setEmail(updatedUserData.data.email);
      setProfilePhoto(
        updatedUserData.data.profile_photo || '/icons/profilePhoto.svg'
      );
      setReputation(updatedUserData.data.reputation);
      setAnsweredQuestions(updatedUserData.data.answers_count);

      setNewUsername('');
      setNewEmail('');
      setNewPassword('');
      setNewProfilePhoto(null);
      setEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError('Failed to update profile.');
    }
  };
  const handleDeleteProfile = async () => {
    if (!token) {
      setError('No token found');
      return;
    }

    try {
      await deleteProfileUser(token);
      // წაშლის შემდეგ რედირექტი ან სხვა მოქმედება, მაგალითად სესიასთან გასვლა
      console.log('Profile deleted successfully');
    } catch (error) {
      setError('Failed to delete profile');
      console.error(error);
    }
  };

  return (
    <div className="mt-40 flex items-center justify-center">
      <div className="w-full max-w-screen-xl rounded-lg bg-white bg-opacity-50 p-4 shadow-none backdrop-blur-md md:p-5 lg:w-2/3 lg:p-6 xl:p-7 2xl:p-8">
        <h1 className="self-start text-lg font-bold md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
          Profile
        </h1>

        <div className="relative mx-auto my-6 flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-300 transition duration-300 hover:ring-2 hover:ring-gray-400 md:h-28 md:w-28 lg:h-28 lg:w-28 xl:h-32 xl:w-32 2xl:h-36 2xl:w-36">
          <label
            htmlFor="profilePhotoInput"
            className="relative cursor-pointer"
          >
            <img
              src={profilePhoto}
              alt="Profile"
              className="h-full w-full object-cover"
            />
            <img
              className="absolute right-2 top-2 h-6 w-6 cursor-pointer xl:h-8 xl:w-8 2xl:h-10 2xl:w-10"
              src="/icons/camera.svg"
              alt="Camera Icon"
            />
            <input
              id="profilePhotoInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleProfilePhotoChange(e)}
            />
          </label>
        </div>

        <div className="mb-6 text-center">
          <h1 className="mt-3 text-lg font-semibold md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
            {username || 'Loading...'}
          </h1>
          <p className="text-base text-gray-500 md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
            {email || 'Loading...'}
          </p>
        </div>

        {editing ? (
          <form onSubmit={handleUpdateProfile} className="mt-4">
            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-600"
                htmlFor="newUsername"
              >
                New Username
              </label>
              <input
                id="newUsername"
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 text-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-600"
                htmlFor="newEmail"
              >
                New Email
              </label>
              <input
                id="newEmail"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 text-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-600"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 text-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 px-6 py-3 text-lg text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Profile
              </button>
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <button
                className="rounded-md bg-red-500 px-6 py-3 text-lg text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => setConfirmDelete(!confirmDelete)}
              >
                Delete Profile
              </button>
            </div>

            {confirmDelete && (
              <div className="mt-4 text-center">
                <p className="text-lg text-red-500">
                  Are you sure you want to delete your profile?
                </p>
                <div className="mt-4 flex justify-center space-x-4">
                  <button
                    className="rounded-md bg-green-500 px-6 py-3 text-lg text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={handleDeleteProfile}
                  >
                    Yes, Delete
                  </button>
                  <button
                    className="rounded-md bg-gray-300 px-6 py-3 text-lg text-black shadow-sm hover:bg-gray-400 focus:outline-none"
                    onClick={() => setConfirmDelete(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </form>
        ) : (
          <div className="mt-4 text-center">
            <button
              className="text-xl text-blue-500"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}

        <div className="mt-6 w-full space-y-6">
          <h2 className="text-center text-lg font-semibold text-gray-400 md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
            INFORMATION
          </h2>
          <div className="flex justify-between border-b border-gray-300 py-6 text-gray-700">
            <span className="text-lg text-gray-400 md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
              Score
            </span>
            <span className="font-semibold text-gray-600 md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
              {reputation !== null ? reputation : 'Loading...'}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-300 py-6 text-gray-700">
            <span className="text-lg text-gray-400 md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
              Answered Questions
            </span>
            <span className="font-semibold text-gray-600 md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
              {answeredQuestions !== null ? answeredQuestions : 'Loading...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
