import { fetchUser } from '@/api/requests/getUserInfo';
import { useEffect, useState } from 'react';

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUser();

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-screen-xl rounded-lg bg-white p-4 shadow-lg md:p-5 lg:p-6 xl:p-7 2xl:p-8">
        <h1 className="self-start text-sm font-bold md:text-base lg:text-lg xl:text-xl 2xl:text-xl">
          Profile
        </h1>

        <div className="md:h-15 md:w-15 lg:h-18 lg:w-18 xl:h-22 xl:w-22 relative mx-auto my-6 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-300 2xl:h-24 2xl:w-24">
          <img
            src={profilePhoto}
            alt="Profile"
            className="h-full w-full object-cover"
          />
          <img
            className="absolute right-1 top-1 h-4 w-4 cursor-pointer xl:h-5 xl:w-5 2xl:h-6 2xl:w-6"
            src="/icons/camera.svg"
            alt="Camera Icon"
          />
        </div>

        <div className="mb-6 text-center">
          <h1 className="mt-3 text-xs font-semibold md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl">
            {username || 'Loading...'}
          </h1>
          <p className="text-xs text-gray-500 md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
            {email || 'Loading...'}
          </p>
        </div>

        <div className="mt-4 w-full space-y-4">
          <h2 className="text-center text-sm font-semibold text-gray-400 md:text-base lg:text-lg xl:text-xl 2xl:text-lg">
            INFORMATION
          </h2>
          <div className="flex justify-between border-b border-gray-300 py-4 text-gray-700">
            <span className="text-sm text-gray-400 md:text-base lg:text-lg xl:text-xl 2xl:text-lg">
              Score
            </span>
            <span className="font-semibold text-gray-600 md:text-lg lg:text-xl xl:text-2xl 2xl:text-lg">
              {reputation !== null ? reputation : 'Loading...'}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-300 py-4 text-gray-700">
            <span className="text-sm text-gray-400 md:text-base lg:text-lg xl:text-xl 2xl:text-lg">
              Answered Questions
            </span>
            <span className="font-semibold text-gray-600 md:text-lg lg:text-xl xl:text-2xl 2xl:text-lg">
              {answeredQuestions !== null ? answeredQuestions : 'Loading...'}
            </span>
          </div>

          <div className="py-4 lg:hidden">
            <div className="border-b border-gray-300 py-4">
              <button
                className="flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => {
                  localStorage.removeItem('accessToken');
                  window.location.href = '/login';
                }}
              >
                <img
                  src="/icons/logout.svg"
                  alt="Log Out Icon"
                  className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7"
                />
                <span className="ml-2 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-lg">
                  Log Out
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
