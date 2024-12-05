import { IoIosCheckmark } from 'react-icons/io';
import StaticTag from './StaticTag';

const Question = () => {
  return (
    <div className="rounded-xl bg-white p-4 cursor-pointer">
      <div className="mb-1 flex items-center justify-between text-gray-500">
        <span className="text-sm">Swift Operators</span>
        <span className="text- text-xs">Replies: 5</span>
      </div>
      <div className="mb-2 flex justify-between">
        <span className="font-semibold">How to implement the code</span>
        <span className="text-3xl text-green-500">
          <IoIosCheckmark />
        </span>
      </div>
      <div className="flex gap-3">
        <StaticTag>Frontend</StaticTag>
        <StaticTag>Backend</StaticTag>
        <StaticTag>iOS</StaticTag>
      </div>
    </div>
  );
};

export default Question;
