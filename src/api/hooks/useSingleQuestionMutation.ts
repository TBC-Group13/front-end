import { useQuery } from 'react-query';
import { getSingleQuestion } from '@/api/requests/getSingleQuestion';
import { QuestionData } from '@/pages/singleQuestion/interfaces';

export const useSingleQuestionQuery = (id: string | number) => {
  return useQuery<QuestionData, Error>({
    queryKey: ['singleQuestion', id],
    queryFn: () => getSingleQuestion(id),
    enabled: !!id,
    onSuccess: () => {
      console.log('Question fetched successfully');
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('Error fetching question:', error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    },
  });
};
