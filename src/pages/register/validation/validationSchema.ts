import * as Yup from 'yup';

export const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  repeat_password: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Repeat password is required'),
});
