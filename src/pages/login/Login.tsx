import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '../../components/Form Components/FormInput';
import PasswordField from '../../components/Form Components/PasswordField';
import { validationSchema } from './validation';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';

export const mobileStylesForForms = `border-white sm:border-neutral-200 shadow-none sm:shadow-lg`;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const { loginUser, isLoading } = useLogin();
  const navigate = useNavigate();

  interface FormData {
    identifier: string;
    password: string;
  }

  const onSubmit = async (data: FormData) => {
    await loginUser(data, () => navigate('/'));
  };

  return (
    <div className="mt-12 flex items-center justify-center font-anek-devanagari sm:mt-28">
      <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <Card className={`flex flex-col gap-3 p-5 ${mobileStylesForForms}`}>
          <CardHeader>
            <CardTitle className="mt-2 self-start text-3xl sm:self-center sm:text-xl">
              Login
            </CardTitle>
          </CardHeader>

          <CardContent className="pb-24 sm:pb-0">
            <FormInput
              label="Username or Email"
              type="text"
              placeholder="Username or Email"
              register={register('identifier')}
              error={errors.identifier?.message}
            />
            <PasswordField
              label="Password"
              register={register('password')}
              error={errors.password?.message}
              showSignUpLink={true}
            />
          </CardContent>

          <Button
            className="w-[87%] self-center py-6 sm:py-3"
            variant="default"
            type="submit"
            disabled={isLoading}
          >
            Log In
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default Login;
