import { Label } from '@/components/Form Components/Label';
import { Answer } from '../interfaces';
import { format } from 'date-fns';
import { IoIosCheckmark } from 'react-icons/io';
import { markAnswerCorrect } from '@/api/requests/markAnswerCorrect';

interface AnswersContainerProps {
  answers: Answer[];
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
}

export const AnswersContainer: React.FC<AnswersContainerProps> = ({
  answers,
  setAnswers,
}) => {
  const handleMarkCorrect = async (answerId: number) => {
    try {
      await markAnswerCorrect(answerId);
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === answerId
            ? { ...answer, is_correct: true }
            : { ...answer, is_correct: false }
        )
      );
    } catch (error) {
      console.error('Error marking answer as correct:', error);
    }
  };

  return answers && answers.length > 0 ? (
    <ul className="space-y-4">
      {answers.map((answer) => (
        <li
          key={answer.id}
          className="rounded-md border bg-white p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">
                Author: {answer.author}
              </div>
              <div className="text-sm text-gray-500">
                Created At:{' '}
                {format(new Date(answer.created_at), 'EEEE, d MMMM yyyy')}
              </div>
              <div className="mt-2 text-gray-700">{answer.text}</div>
            </div>
            <div className="flex items-center">
              {answer.is_correct ? (
                <>
                  <span className="mr-2 text-sm text-green-500">Completed</span>
                  <IoIosCheckmark className="text-3xl text-green-500" />
                </>
              ) : (
                <span
                  className="group relative cursor-pointer text-3xl text-green-500"
                  onClick={() => handleMarkCorrect(answer.id)}
                >
                  <IoIosCheckmark />
                  <span className="absolute right-full top-0 mr-2 hidden w-max rounded bg-gray-800 p-2 text-xs text-white group-hover:flex">
                    press to complete (only question author can complete)
                  </span>
                </span>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <Label label="No answers available" />
  );
};
