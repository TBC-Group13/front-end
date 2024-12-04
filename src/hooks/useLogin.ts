import { useAtom } from 'jotai';
import { errorAtom } from '../store/store';
import { loginUser as apiLoginUser } from '../api/login';

interface FormData {
  identifier: string;
  password: string;
}

export const useLogin = () => {
  const [, setError] = useAtom(errorAtom);

  const loginUser = async (data: FormData, onSuccess: () => void) => {
    try {
      const result = await apiLoginUser({
        identifier: data.identifier,
        password: data.password,
      });

      setError(null);
      console.log('User logged in successfully:', result);
      onSuccess();
    } catch (error) {
      setError('Error logging in user');
      console.error('Error logging in user:', error);
    }
  };

  return { loginUser };
};