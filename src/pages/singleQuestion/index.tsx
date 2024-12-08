import { useSingleQuestionQuery } from '@/api/hooks/useSingleQuestionMutation';

import { SingleQuestContainer } from './container';
import { useParams } from 'react-router-dom';

export const SingleQuestion = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useSingleQuestionQuery(id!);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;
  if (!data) return <p>No data found</p>;
  return <SingleQuestContainer data={data} />;
};
