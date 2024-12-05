import { FaPlus } from 'react-icons/fa6';

const HomeTitle = () => {
  return (
    <div className="mb-5 flex items-center justify-between text-xl font-bold">
      <h1>Questions</h1>
      <div className="cursor-pointer text-2xl text-purple-500">
        <FaPlus />
      </div>
    </div>
  );
};

export default HomeTitle;
