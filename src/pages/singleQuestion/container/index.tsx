import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { SingleQuestContainerProps } from '../interfaces';
import { CardTitle } from '@/components/ui/card';
import { AnswersContainer } from './AnswersContainer';
import { CreatedData } from './createdData';
import { postAnswer } from '@/api/requests/postAnswer';
import vector from '@/assets/Vector.png';
import { useState } from 'react';

export const SingleQuestContainer: React.FC<SingleQuestContainerProps> = ({
  data,
}) => {
  const [text, setText] = useState('');
  const [answers, setAnswers] = useState(data.results);

  const handleSendAnswer = async () => {
    if (text.trim()) {
      try {
        const newAnswer = await postAnswer(data.question_id, text);
        setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
        setText('');
      } catch (error) {
        console.error('Error posting answer:', error);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendAnswer();
    }
  };

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="rounded-md border-2 bg-gray-50 p-4 shadow-md lg:m-8">
        <div>
          <CreatedData data={data} />
          <CardTitle className="mb-4 text-xl font-semibold">
            {data?.question_title}?
          </CardTitle>
          <p className="mb-4 text-gray-700">{data.description}</p>
          <AnswersContainer answers={answers} setAnswers={setAnswers} />
          <div className="relative mt-4 flex w-full items-center">
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-base placeholder-gray-400 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Tap your reply here"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <img
              onClick={handleSendAnswer}
              className="absolute right-3 top-1/2 h-5 -translate-y-1/2 transform cursor-pointer"
              src={vector}
              alt="send"
            />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
