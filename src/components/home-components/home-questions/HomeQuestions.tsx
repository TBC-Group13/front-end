import listEmpty from '@/assets/list-empty.png';
import Question from '../Question';
import { FC, useEffect, useState } from 'react';
import { useGeneralQuestions } from '@/api/hooks/useGeneralQuestions';
import { usePersonalQuestions } from '@/api/hooks/usePersonalQuestions';
import { fetchQuestionsWithTags } from '@/api/requests/fetchQuestionsWithTags';
import { fetchQuestionsWithSearch } from '@/api/requests/fetchQuestionsWithSearch';
import { useNavigate } from 'react-router-dom';

interface QuestionData {
  id: number;
  title: string;
  description: string;
  tags: { id: number; name: string }[];
  answers: { id: number; content: string; author: string }[];
  completed: boolean;
}

const HomeQuestions: FC<{
  activeTab: 'personal' | 'general';
  selectedTags: string[];
  searchQuery: string;
}> = ({ activeTab, selectedTags, searchQuery }) => {
  const { data: generalQuestions, isLoading: isLoadingGeneral } =
    useGeneralQuestions(activeTab === 'general');
  const { data: personalQuestions, isLoading: isLoadingPersonal } =
    usePersonalQuestions(activeTab === 'personal');
  const [filteredQuestions, setFilteredQuestions] = useState<
    QuestionData[] | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      let questions: QuestionData[] | undefined = [];

      if (activeTab === 'general') {
        if (searchQuery) {
          questions = await fetchQuestionsWithSearch(searchQuery);
        } else if (selectedTags.length > 0) {
          questions = await fetchQuestionsWithTags(selectedTags);
        } else {
          questions = generalQuestions;
        }
      } else {
        questions = personalQuestions?.results;

        if (searchQuery) {
          questions = questions?.filter(
            (question) =>
              question.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              question.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          );
        }

        if (selectedTags.length > 0) {
          questions = questions?.filter((question) =>
            question.tags.some((tag) =>
              selectedTags.includes(typeof tag === 'string' ? tag : tag.name)
            )
          );
        }
      }

      setFilteredQuestions(questions);
      setLoading(false);
    };

    fetchQuestions();
  }, [
    activeTab,
    selectedTags,
    searchQuery,
    generalQuestions,
    personalQuestions,
  ]);

  const questions = filteredQuestions;
  const navigate = useNavigate();
  if (loading || isLoadingGeneral || isLoadingPersonal) {
    return <div>Loading...</div>;
  }

  const handleGoNextPage = (id: number) => {
    navigate(`/singleQuestion/${id}`);
  };

  return (
    <div>
      {questions?.length !== undefined && questions.length > 0 ? (
        <div className="flex flex-col gap-y-5 rounded-xl bg-gray-100 p-5">
          {questions?.map((question: QuestionData) => (
            <div onClick={() => handleGoNextPage(question.id)}>
              <Question
                key={question.id}
                data={{
                  id: question.id,
                  title: question.title || '',
                  description: question.description || '',
                  tags: question.tags || [],
                  answers: question.answers || [],
                  completed: question.completed,
                }}
              />
            </div>
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
