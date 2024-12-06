import listEmpty from '@/assets/list-empty.png';
import Question from "../Question";
import { FC } from 'react';

const questionsData = [{}, {}, {}, {}, {}];

const HomeQuestions: FC<{isButtonActive: boolean}> = ({isButtonActive}) => {
  return (
    <div>
        {questionsData.length !== 0 ? (
        <div className="flex flex-col gap-y-5 rounded-xl bg-gray-100 p-5">
          {/*@ts-ignore */}
          {questionsData.map((items, index) => (
            <Question key={index} />
          ))}
        </div>
      ) : isButtonActive ? (
        <div className="mt-20 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <span className="text-gray-400">No question yet</span>
            <span className="font-semibold">Be the first to ask one</span>
          </div>
          <img className="w-80" src={listEmpty} alt="" />
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
  )
};

export default HomeQuestions;