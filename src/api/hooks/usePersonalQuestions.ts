import { useQuery } from 'react-query';
import { fetchPersonalQuestions } from '@/api/requests/personalQuestions';

export const usePersonalQuestions = (enabled: boolean) => {
  return useQuery({
    queryKey: ['personalQuestions'],
    queryFn: fetchPersonalQuestions,
    enabled,
  });
};