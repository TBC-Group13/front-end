import { Input } from '@/components/ui/input';
import { QuestionLabel } from './QuestionLabel';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import * as Yup from 'yup';
import { validationSchema } from './validation';
import { AddTag } from './AddTag';
import { createQuestion } from '@/api/requests/createQuestions';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export const CreateQuestion = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const mutation = useMutation({
    mutationFn: () => createQuestion(title, description, tags, accessToken),
    onSuccess: () => {
      setTitle('');
      setDescription('');
      setTags([]);
      setErrors({});
      toast.success('Create Question successfully');
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        { title, description, tags, authentication: accessToken },
        { abortEarly: false }
      );

      mutation.mutate();
    } catch (validationErrors) {
      if (validationErrors instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        validationErrors.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col lg:mx-80 lg:mt-10 lg:gap-7">
        <div>
          <QuestionLabel text="Question Title" />
          <Input
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            onBlur={() => {
              try {
                validationSchema.validateSync({
                  title,
                  description,
                  tags,
                  authentication: accessToken,
                });
                setErrors((prev) => ({ ...prev, title: '' }));
              } catch (error) {
                if (error instanceof Yup.ValidationError) {
                  const errorMessage = error.errors.find((msg) =>
                    msg.includes('title')
                  );
                  setErrors((prev) => ({ ...prev, title: errorMessage || '' }));
                }
              }
            }}
          />
          {errors.title && <div className="text-red-500">{errors.title}</div>}
        </div>

        <div>
          <QuestionLabel text="Question Description" />
          <Textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            onBlur={() => {
              try {
                validationSchema.validateSync({
                  title,
                  description,
                  tags,
                  authentication: accessToken,
                });
                setErrors((prev) => ({ ...prev, description: '' }));
              } catch (error) {
                if (error instanceof Yup.ValidationError) {
                  const errorMessage = error.errors.find((msg) =>
                    msg.includes('description')
                  );
                  setErrors((prev) => ({
                    ...prev,
                    description: errorMessage || '',
                  }));
                }
              }
            }}
            className="lg:h-40"
          />
          {errors.description && (
            <div className="text-red-500">{errors.description}</div>
          )}
        </div>

        <div>
          <QuestionLabel text="Tabs" />
          <AddTag tags={tags} setTags={setTags} />
          {errors.tags && <div className="text-red-500">{errors.tags}</div>}
        </div>

        <Button type="submit" className="w-[100%]">
          Create
        </Button>

        {errors.authentication && (
          <div className="text-red-500">{errors.authentication}</div>
        )}
      </div>
    </form>
  );
};
