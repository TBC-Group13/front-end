import { Input } from '@/components/ui/input';
import { QuestionLabel } from './QuestionLabel';
import { Textarea } from '@/components/ui/textarea';
<<<<<<< Updated upstream
import { Label } from '@radix-ui/react-label';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
// import { useState } from 'react';

export const CreateQuestion = () => {
  // const [inputValue, setInputValue] = useState('');
  const tags = ['React', 'JS'];
=======
import { AddTab } from './AddTab';
import { Button } from '@/components/ui/button';

export const CreateQuestion = () => {
>>>>>>> Stashed changes
  return (
    <div className="flex flex-col gap-8 lg:mx-80 lg:mt-10">
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
      <Button>Create</Button>
    </div>
  );
};
