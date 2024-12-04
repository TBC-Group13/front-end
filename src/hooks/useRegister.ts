import { useAtom } from 'jotai';
import { errorAtom } from '../store/store';
import { registerUser as apiRegisterUser } from '../api/register';

interface FormData {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export const useRegister = () => {
  const [, setError] = useAtom(errorAtom);

  const registerUser = async (data: FormData, onSuccess: () => void) => {
    try {
      const result = await apiRegisterUser({
        username: data.username,
        email: data.email,
        password: data.password,
        repeat_password: data.repeatPassword,
      });

      setError(null);
      console.log('User registered successfully:', result);
      onSuccess();
    } catch (error) {
      setError('Error registering user');
      console.error('Error registering user:', error);
    }
  };

  return { registerUser };
};