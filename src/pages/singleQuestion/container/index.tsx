import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { SingleQuestContainerProps } from '../interfaces';
import { CardTitle } from '@/components/ui/card';
import { AnswersContainer } from './AnswersContainer';

export const SingleQuestContainer: React.FC<SingleQuestContainerProps> = ({
  data,
}) => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="border-2 p-2 lg:m-8">
        <div>
          <CardTitle className="mb-4">{data?.question_title}?</CardTitle>
          <AnswersContainer data={data} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
