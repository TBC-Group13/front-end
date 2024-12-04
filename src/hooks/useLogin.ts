import { useAtom } from 'jotai';
import { errorAtom } from '../store/store'; 
import { loginUser as apiLoginUser } from '../api/login'; 

interface FormData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [, setError] = useAtom(errorAtom);

  const loginUser = async (data: FormData, onSuccess: () => void) => {
    try {
      const result = await apiLoginUser({
        email: data.email,
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