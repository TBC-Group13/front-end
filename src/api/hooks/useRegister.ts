import { useMutation } from 'react-query';
import { useAtom } from 'jotai';
import { errorAtom } from '../../store/store';
import { registerUser as apiRegisterUser } from '../requests/register';

interface FormData {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export const useRegister = () => {
  const [, setError] = useAtom(errorAtom);

  const mutation = useMutation(apiRegisterUser, {
    onSuccess: () => {
      setError(null);
    },
    onError: (error) => {
      setError('Error registering user');
      console.error('Error registering user:', error);
    },
  });

  const registerUser = async (data: FormData, onSuccess: () => void) => {
    mutation.mutate(
      {
        username: data.username,
        email: data.email,
        password: data.password,
        repeat_password: data.repeatPassword,
      },
      {
        onSuccess,
      }
    );
  };

  return { registerUser, isLoading: mutation.isLoading };
};
