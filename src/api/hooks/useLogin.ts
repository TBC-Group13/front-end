import { useMutation } from 'react-query';
import { useAtom } from 'jotai';
import { errorAtom } from '../../store/store';
import { loginUser as apiLoginUser } from '../requests/login';
import { refreshToken as apiRefreshToken } from '../requests/refreshToken';
import { isAuthenticatedAtom } from '../../store/authAtoms';

interface FormData {
  identifier: string;
  password: string;
}

export const useLogin = () => {
  const [, setError] = useAtom(errorAtom);
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const loginMutation = useMutation(apiLoginUser, {
    onSuccess: (data) => {
      setError(null);
      localStorage.setItem('accessToken', data.tokens.access);
      localStorage.setItem('refreshToken', data.tokens.refresh);
      setIsAuthenticated(true);
    },
    onError: (error) => {
      setError('Error logging in user');
      console.error('Error logging in user:', error);
    },
  });

  const refreshMutation = useMutation(apiRefreshToken, {
    onSuccess: (data) => {
      setError(null);
      localStorage.setItem('accessToken', data.access);
    },
    onError: (error) => {
      setError('Error refreshing token');
      console.error('Error refreshing token:', error);
    },
  });

  const loginUser = async (data: FormData, onSuccess: () => void) => {
    loginMutation.mutate(data, {
      onSuccess,
    });
  };

  const refreshUserToken = async (refreshToken: string) => {
    refreshMutation.mutate(refreshToken);
  };

  return { loginUser, refreshUserToken, isLoading: loginMutation.isLoading || refreshMutation.isLoading };
};