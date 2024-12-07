import listEmpty from '@/assets/list-empty.png';
import Question from '../Question';
import { FC } from 'react';
import { useGeneralQuestions } from '@/api/hooks/useGeneralQuestions';
import { usePersonalQuestions } from '@/api/hooks/usePersonalQuestions';

interface QuestionData {
  id: number;
  title: string;
  description: string;
  tags: { id: number; name: string }[];
  answers: { id: number; content: string; author: string }[];
}

const HomeQuestions: FC<{ activeTab: 'personal' | 'general' }> = ({
  activeTab,
}) => {
  const { data: generalQuestions } = useGeneralQuestions(
    activeTab === 'general'
  );
  const { data: personalQuestions } = usePersonalQuestions(
    activeTab === 'personal'
  );

  const questions: QuestionData[] | undefined =
    activeTab === 'general' ? generalQuestions : personalQuestions?.results;

  return (
    <div>
      {questions?.length !== undefined && questions.length > 0 ? (
        <div className="flex flex-col gap-y-5 rounded-xl bg-gray-100 p-5">
          {questions?.map((question: QuestionData) => (
            <Question
              key={question.id}
              data={{
                id: question.id,
                title: question.title || '',
                description: question.description || '',
                tags: question.tags || [],
                answers: question.answers || [],
              }}
            />
          ))}
        </div>
      ) : (
        <div className="mt-20 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <span className="text-gray-400">Got a question in mind?</span>
            <span className="font-semibold">
              Ask it and wait for like-minded people to answer
            </span>
          </div>
          <img className="w-80" src={listEmpty} alt="" />
        </div>
      )}
    </div>
  );
};

export default HomeQuestions;
