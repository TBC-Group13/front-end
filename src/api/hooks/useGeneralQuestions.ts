import { useQuery } from 'react-query';
import { fetchQuestions } from '@/api/requests/generalQuestions';

export const useGeneralQuestions = (enabled: boolean) => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
    select: (data) => (data ? [...data] : []),
    enabled,
  });
};