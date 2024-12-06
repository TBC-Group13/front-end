import { IoIosCheckmark } from 'react-icons/io';
import StaticTag from './StaticTag';
import { FC } from 'react';

interface QuestionProps {
  data: {
    title: string;
    description: string;
    tags: { name: string }[];
  }[];
  index: number;
}

const Question: FC<QuestionProps> = ({data, index}) => {
  
  console.log(data[index])

  return (
    <div className="rounded-xl bg-white p-4 cursor-pointer">
      <div className="mb-1 flex items-center justify-between text-gray-500">
        <span className="text-sm">{data[index].title}</span>
        <span className="text- text-xs">Replies: 5</span>
      </div>
      <div className="mb-2 flex justify-between">
        <span className="font-semibold">{data[index].description}</span>
        <span className="text-3xl text-green-500">
          <IoIosCheckmark />
        </span>
      </div>
      <div className="flex gap-3">
      {data[index].tags.map((items: any) => <StaticTag key={index}>{items.name}</StaticTag>)}
      </div>
    </div>
  );
};

export default Question;
