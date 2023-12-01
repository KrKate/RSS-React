import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required()
      .matches(/^[A-Z]/, 'First letter should be uppercase'),
    age: yup.number().required().positive().integer(),
    email: yup.string().required().email(),
    gender: yup.string().required(),
    password1: yup
      .string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character'
      ),
    password2: yup
      .string()
      .required()
      .oneOf([yup.ref('password1')], 'Passwords must match'),
    terms: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions'),
    image: yup
      .mixed<FileList>()
      .test(
        'fileSize',
        'Only documents up to 2MB are permitted.',
        (files) =>
          !files ||
          files.length === 0 ||
          Array.from(files).every((file) => file.size <= 2000000)
      ),
  })
  .required();

// type FormData = {
//   name: string;
//   age: number;
//   email: string;
//   password1: string;
//   password2: string;
//   gender: string;
//   terms?: boolean;
//   image?: FileList;
// }

export const HooksForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  // const onSubmit = (data: FormData) => {
  //   console.log(data);
  // };

  return (
    <>
      <Link to="/">Main</Link>
      <h2>React Hook Form</h2>
      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <label htmlFor="name">
          <h5>First Name:</h5>
          <input type="text" id="name" {...register('name')} />
        </label>
        {errors.name && <p>{errors.name.message}</p>}

        <label htmlFor="age">
          <h5>Age:</h5>
          <input type="number" id="age" {...register('age')} />
        </label>
        {errors.age && <p>{errors.age.message}</p>}

        <label htmlFor="email">
          <h5>Mail:</h5>
          <input type="text" {...register('email')} />
        </label>
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="password1">
          <h5>Password:</h5>
          <input type="password" id="password1" {...register('password1')} />
        </label>
        {errors.password1 && <p>{errors.password1.message}</p>}

        <label htmlFor="password2">
          <h5>Confirm Password:</h5>
          <input type="password" id="password2" {...register('password2')} />
        </label>
        {errors.password2 && <p>{errors.password2.message}</p>}

        <label htmlFor="gender">
          <h5>Gender:</h5>
          <select id="gender" {...register('gender')}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p>{errors.gender.message}</p>}
        </label>
        <label htmlFor="terms">
          <input
            type="checkbox"
            id="terms"
            {...register('terms', { value: false })}
          />
          <span>Accept Terms and Conditions</span>
        </label>
        {errors.terms && <p>{errors.terms.message}</p>}

        <label htmlFor="image">
          <h5>Image:</h5>
          <input type="file" id="image" {...register('image')} />
          {errors.image && <p>{errors.image.message}</p>}
        </label>

        <input type="submit" />
      </form>
    </>
  );
};

export default HooksForm;
