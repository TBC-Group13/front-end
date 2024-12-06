import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .max(255, 'Title must be at most 255 characters'),
  description: Yup.string().required('Description is required'),
  tags: Yup.array().min(1, 'At least one tag is required'),
  authentication: Yup.string().required('Authentication is required'),
});
