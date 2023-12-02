import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormData } from '../types';

export const schema = yup
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
      .test('fileSize', 'Only documents up to 2MB are permitted.', (value) => {
        return value && value[0] && value[0].size <= 2000000;
      })
      .test(
        'type',
        'Only the following formats are accepted: .png, .jpeg',
        (value) => {
          return (
            value &&
            value[0] &&
            (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
          );
        }
      ),
  })
  .required();

export const HooksForm = () => {
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(JSON.stringify(data));
  };

  return (
    <>
      <Link to="/">Main</Link>
      <h2>React Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          <h5>First Name:</h5>
          <input type="text" id="name" {...register('name')} />
        </label>
        <div className="error">
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <label htmlFor="age">
          <h5>Age:</h5>
          <input type="number" id="age" {...register('age')} />
        </label>
        <div className="error">{errors.age && <p>{errors.age.message}</p>}</div>

        <label htmlFor="email">
          <h5>Mail:</h5>
          <input type="text" {...register('email')} />
        </label>
        <div className="error">
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <label htmlFor="password1">
          <h5>Password:</h5>
          <input type="password" id="password1" {...register('password1')} />
        </label>
        <div className="error">
          {errors.password1 && <p>{errors.password1.message}</p>}
        </div>

        <label htmlFor="password2">
          <h5>Confirm Password:</h5>
          <input type="password" id="password2" {...register('password2')} />
        </label>
        <div className="error">
          {errors.password2 && <p>{errors.password2.message}</p>}
        </div>

        <label htmlFor="gender">
          <h5>Gender:</h5>
          <select id="gender" {...register('gender')}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <div className="error">
            {errors.gender && <p>{errors.gender.message}</p>}
          </div>
        </label>

        <label htmlFor="terms" className="terms">
          <input
            type="checkbox"
            id="terms"
            {...register('terms', { value: false })}
          />
          <div className="accept">Accept Terms and Conditions</div>
        </label>
        <div className="error">
          {errors.terms && <p>{errors.terms.message}</p>}
        </div>

        <label htmlFor="image">
          <h5>Image:</h5>
          <input type="file" id="image" {...register('image')} />
          <div className="error">
            {errors.image && <p>{errors.image.message}</p>}
          </div>
        </label>

        <input type="submit" disabled={!isValid || !isDirty} />
      </form>
    </>
  );
};

export default HooksForm;
