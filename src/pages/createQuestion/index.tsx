import { Input } from '@/components/ui/input';
import { QuestionLabel } from './QuestionLabel';
import { Textarea } from '@/components/ui/textarea';
import { AddTab } from './AddTab';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useState } from 'react';

export const CreateQuestion = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const accessToken = localStorage.getItem('accessToken');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessToken) {
      console.error('Access token is missing.');
      return;
    }

    const tagIds = tags.map((tag) => tag.id);

    console.log(title, description, tagIds);

    const payload = {
      title,
      description,
      tags: tagIds,
    };

    try {
      const response = await axios.post(`${baseURL}/questions/`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('Question created:', response.data);

      setTitle('');
      setDescription('');
      setTags([]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col lg:mx-80 lg:mt-10 lg:gap-7">
        <div>
          <QuestionLabel text="Question Title" />
          <Input value={title} onChange={(ev) => setTitle(ev.target.value)} />
        </div>
        <div>
          <QuestionLabel text="Question Description" />
          <Textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            className="lg:h-40"
          />
        </div>
        <div>
          <QuestionLabel text="Tabs" />

          <AddTab tags={tags} setTags={setTags} />
        </div>
        <Button type="submit" className="w-[100%]">
          Create
        </Button>
      </div>
    </form>
  );
};
