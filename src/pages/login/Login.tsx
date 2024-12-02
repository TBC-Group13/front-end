import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '../../components/Form Components/FormInput';
import PasswordField from '../../components/Form Components/PasswordField';
import { validationSchema } from './validation';

export const mobileStylesForForms = `max-[600px]:border-none max-[600px]:shadow-none max-[420px]:p-[0]`;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  interface FormData {
    email: string;
    password: string;
  }

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="mt-20 flex items-center justify-center font-anek-devanagari">
      <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <Card className={`flex flex-col gap-3 p-5 ${mobileStylesForForms}`}>
          <CardHeader>
            <CardTitle className="mt-2 self-center text-xl max-[600px]:text-[30px]">
              Log in
            </CardTitle>
          </CardHeader>

          <CardContent>
            <FormInput
              label="Email"
              type="text"
              placeholder="Email"
              register={register('email')}
              error={errors.email?.message}
            />
            <PasswordField
              label="Password"
              register={register('password')}
              error={errors.password?.message}
              showForgetPassword={true}
              showSignUpLink={true}
            />
          </CardContent>

          <Button className="w-[87%] self-center" variant="default">
            Log In
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default Login;
