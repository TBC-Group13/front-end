import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomBar: React.FC = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState<string>('');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActiveButton('home');
    } else if (path === '/profile') {
      setActiveButton('profile');
    } else if (path === '/liderboard') {
      setActiveButton('liderboard');
    } else {
      setActiveButton('');
    }
  }, [location.pathname]);

  return (
    <footer className="flex justify-around rounded-t-3xl bg-[#F3F2F1] py-3 lg:hidden">
      <Link to="/">
        <button
          className={`flex cursor-pointer flex-col items-center ${
            activeButton === 'home' ? 'text-[#4E53A2]' : 'text-grey'
          }`}
        >
          <img
            src="/icons/home.svg"
            alt="Home"
            className={`grey h-6 w-6 ${
              activeButton === 'home'
                ? 'hue-rotate+180 filter'
                : 'hue-rotate-180 filter'
            }`}
          />

          <span
            className={activeButton === 'home' ? 'text-[#4E53A2]' : 'text-grey'}
          >
            Home
          </span>
        </button>
      </Link>

      <Link to="/liderboard">
        <button
          className={`flex cursor-pointer flex-col items-center ${
            activeButton === 'liderboard' ? 'text-[#4E53A2]' : 'text-grey'
          }`}
        >
          <img
            src="/icons/leaderboard.svg"
            alt="liderboard"
            className={`h-6 w-6 ${
              activeButton === 'liderboard'
                ? 'hue-rotate+180 filter'
                : 'hue-rotate-180 filter'
            }`}
          />
          <span
            className={
              activeButton === 'liderboard' ? 'text-[#4E53A2]' : 'text-grey'
            }
          >
            Liderboard
          </span>
        </button>
      </Link>

      <Link to="/profile">
        <button
          className={`flex cursor-pointer flex-col items-center lg:hidden ${
            activeButton === 'profile' ? 'text-[#4E53A2]' : 'text-grey'
          }`}
        >
          <img
            src="/icons/profile.svg"
            alt="profile"
            className={`h-6 w-6 ${
              activeButton === 'profile'
                ? 'hue-rotate+180 filter'
                : 'hue-rotate-180 filter'
            }`}
          />
          <span
            className={
              activeButton === 'profile' ? 'text-[#4E53A2]' : 'text-grey'
            }
          >
            Profile
          </span>
        </button>
      </Link>
    </footer>
  );
};

export default BottomBar;
