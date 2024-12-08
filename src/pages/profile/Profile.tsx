import { fetchUser } from '@/api/requests/getUserProfile';
import { useEffect, useState, ChangeEvent } from 'react';
import ProfileDetails from './ProfileDetails';
import ProfileEditForm from './ProfileEditForm';

export default function Profile() {
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
  const [, setNewPassword] = useState<string>('');
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
        setProfilePhoto(userData.profilePhoto || '/icons/profilePhoto.svg');
        setNewUsername(userData.username);
        setNewEmail(userData.email);
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

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setProfilePhoto(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-screen-xl rounded-lg bg-white bg-opacity-50 p-4 shadow-none backdrop-blur-md md:p-5 lg:w-2/3 lg:p-6 xl:p-7 2xl:p-8">
        <h1 className="self-start text-lg font-bold md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
          Profile
        </h1>

        <ProfileDetails
          profilePhoto={profilePhoto}
          handleProfilePhotoChange={handleProfilePhotoChange}
          reputation={reputation}
          answeredQuestions={answeredQuestions}
          username={username}
          email={email}
        />

        {editing ? (
          <ProfileEditForm
            setEditing={setEditing}
            newUsername={newUsername}
            setNewUsername={setNewUsername}
            newEmail={newEmail}
            setNewEmail={setNewEmail}
            setNewPassword={setNewPassword}
            confirmDelete={confirmDelete}
            setConfirmDelete={setConfirmDelete}
            setProfilePhoto={setProfilePhoto}
            setUsername={setUsername}
            setEmail={setEmail}
          />
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
      </div>
    </div>
  );
}
