import { Label } from '@/components/Form Components/Label';
import { AnswersContainerProps } from '../interfaces';

export const AnswersContainer: React.FC<AnswersContainerProps> = ({ data }) => {
  const { results } = data || {};

  return results && results.length > 0 ? (
    <ul>
      {results.map((answer, index) => (
        <li key={index}>Answer: {answer}</li>
      ))}
    </ul>
  ) : (
    <Label label="No answers available" />
  );
};
