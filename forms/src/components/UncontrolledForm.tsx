import { FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required(),
  email: yup.string().email().required(),
  password1: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character'
    ),
});

const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const password1Ref = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const age = ageRef.current?.value;
    const email = emailRef.current?.value;
    const password1 = password1Ref.current?.value;

    schema
      .validate({ name, age, email, password1 })
      .then(() => {
        console.log('Form is valid');
      })
      .catch((err) => {
        console.log(err.errors);
      });
  };

  return (
    <>
      <Link to="/">Main</Link>
      <h2>React Hook Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <h5>Name:</h5>
          <input type="text" ref={nameRef} required />
        </label>
        <label>
          <h5>Age:</h5>
          <input type="number" ref={ageRef} required />
        </label>
        <label>
          <h5>Email:</h5>
          <input type="email" ref={emailRef} required />
        </label>

        <label>
          <h5>Password:</h5>
          <input type="password" ref={password1Ref} required />
        </label>

        <input type="submit"></input>
      </form>
    </>
  );
};

export default UncontrolledForm;
