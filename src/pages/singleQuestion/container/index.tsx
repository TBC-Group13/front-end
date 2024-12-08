import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { SingleQuestContainerProps } from '../interfaces';
import { CardTitle } from '@/components/ui/card';
import { AnswersContainer } from './AnswersContainer';
import { CreatedData } from './createdData';
import { Input } from '@/components/ui/input';
import vector from '@/assets/Vector.png';

export const SingleQuestContainer: React.FC<SingleQuestContainerProps> = ({
  data,
}) => {
  const handlesendAnswer = () => {};
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="border-2 p-2 lg:m-8">
        <div>
          <CardTitle className="mb-4">{data?.question_title}?</CardTitle>
          <p>{data.description}</p>
          <CreatedData data={data} />
          <AnswersContainer data={data} />
          <div className="relative flex w-full">
            <Input className="w-full pl-5" placeholder="tap your replay here" />
            <img
              onClick={handlesendAnswer}
              className="absolute right-3 top-1/2 h-5 -translate-y-1/2 transform cursor-pointer"
              src={vector}
              alt="vector"
            />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
