import { FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { schema } from '../yup/schema';

const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const password1Ref = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const [, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const age = ageRef.current?.value;
    const email = emailRef.current?.value;
    const password1 = password1Ref.current?.value;
    const password2 = password1Ref.current?.value;
    const gender = genderRef.current?.value;

    schema
      .validate({ name, age, email, password1, password2, gender })
      .then(() => {
        setErrors([]);
      })
      .catch((err: { errors: string[] }) => {
        setErrors(err.errors);
      });
  };

  return (
    <>
      <Link to="/">Main</Link>
      <h2>Uncontrolled form</h2>
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

        <label>
          <h5>Confirm Password:</h5>
          <input type="password" ref={password2Ref} required />
        </label>

        <label htmlFor="gender">
          <h5>Gender:</h5>
          <select id="gender" ref={genderRef} required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label htmlFor="terms" className="terms">
          <input type="checkbox" id="terms" required />
          <div className="accept">Accept Terms and Conditions</div>
        </label>

        <input type="submit"></input>
      </form>
    </>
  );
};

export default UncontrolledForm;
