import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const HomeTitle = () => {
  return (
    <div className="mb-5 flex items-center justify-between text-2xl font-bold">
      <h1>Questions</h1>
      <div className="cursor-pointer text-2xl text-purple-500">
        <Link to={'/createQuestion'}>
          <FaPlus />
        </Link>
      </div>
    </div>
  );
};

export default HomeTitle;
