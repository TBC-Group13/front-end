import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import lockIcon from '@/assets/Lock.png';
import { PasswordToggle } from './PasswordToggle';
import { Label } from './Label';
import { Link } from 'react-router-dom';
import { UseFormRegisterReturn } from 'react-hook-form';

interface PasswordFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
  showSignUpLink?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  register,
  error,
  showSignUpLink = false,
}) => {
  const [passwordHide, setPasswordHide] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordHide((prev) => !prev);
  };

  return (
    <div className="mb-4 flex flex-col">
      <div className="mb-1 flex justify-between">
        <Label label={label} />
      </div>
      <div
        className={`flex items-center rounded-md border px-3 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <img src={lockIcon} alt="Lock" className="mr-3 h-5 w-5" />

        <Input
          {...register}
          type={!passwordHide ? 'password' : 'text'}
          placeholder={label}
          className="flex-1 border-none py-6 pt-3 outline-none focus:ring-0 focus-visible:ring-0 sm:p-3"
        />
        <PasswordToggle
          isVisible={passwordHide}
          toggleVisibility={togglePasswordVisibility}
        />
      </div>
      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
      {showSignUpLink && (
        <div className="mt-4 flex items-baseline justify-between">
          <Label label="New To Stay Connected?" />
          <Link to={'/register'} className="font-anek-devanagari text-primary">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default PasswordField;
