import { IoIosCheckmark } from 'react-icons/io';
import StaticTag from './StaticTag';
import { FC } from 'react';

interface QuestionProps {
  data: {
    id: number;
    title: string;
    description: string;
    tags: { id: number; name: string }[];
    answers: { id: number; content: string; author: string }[];
  };
}

const Question: FC<QuestionProps> = ({ data }) => {
  return (
    <div className="cursor-pointer rounded-xl bg-white p-4">
      <div className="mb-1 flex items-center justify-between text-gray-500">
        <span className="text-sm">{data.title}</span>
        <span className="text-xs">Replies: {data.answers.length}</span>
      </div>
      <div className="mb-2 flex justify-between">
        <span className="font-semibold">{data.description}</span>
        <span className="text-3xl text-green-500">
          <IoIosCheckmark />
        </span>
      </div>
      <div className="flex gap-3">
        {data.tags.map((tag) => (
          <StaticTag key={tag.id}>{tag.name}</StaticTag>
        ))}
      </div>
    </div>
  );
};

export default Question;
