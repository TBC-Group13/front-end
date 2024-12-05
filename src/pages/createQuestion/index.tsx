import { Input } from '@/components/ui/input';
import { QuestionLabel } from './QuestionLabel';
import { Textarea } from '@/components/ui/textarea';
import { AddTab } from './AddTab';
import { Button } from '@/components/ui/button';

export const CreateQuestion = () => {
  return (
    <div className="flex flex-col lg:mx-80 lg:mt-10 lg:gap-7">
      <div>
        <QuestionLabel text="Question Title" />
        <Input />
      </div>
      <div>
        <QuestionLabel text="Question Description" />
        <Textarea className="lg:h-40" />
      </div>
      <div>
        <QuestionLabel text="Tabs" />
        <AddTab />
      </div>
      <Button className="w-[100%]">Create</Button>
    </div>
  );
};
