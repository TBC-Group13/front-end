import { Input } from '@/components/ui/input';
import { QuestionLabel } from './QuestionLabel';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useState } from 'react';

export const CreateQuestion = () => {
  const [inputValue, setInputValue] = useState('');
  const tags = ['React', 'JS'];
  return (
    <div className="lg:mx-80 lg:mt-10">
      <QuestionLabel text="Question Title" />
      <Input className="mt-5" />
      <QuestionLabel text="Question Description" />
      <Textarea className="lg:h-40" />
      <Label>Tags</Label>

      <Command>
        <CommandInput className="border-2" />
        <CommandList>
          {tags.map((el) => {
            return <CommandItem>{el}</CommandItem>;
          })}
        </CommandList>
      </Command>
    </div>
  );
};
