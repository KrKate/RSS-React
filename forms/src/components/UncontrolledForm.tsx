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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const age = ageRef.current?.value;
    const email = emailRef.current?.value;
    const password1 = password1Ref.current?.value;
    const password2 = password2Ref.current?.value;
    const gender = genderRef.current?.value;

    try {
      await schema.validate(
        {
          name,
          age,
          email,
          password1,
          password2,
          gender,
        },
        { abortEarly: false }
      );
      setErrors({});
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const validationErrors: { [key: string]: string } = {};
      err.inner.forEach((error: { path: string; message: string }) => {
        validationErrors[error.path as string] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <Link to="/">Main</Link>
      <h2>Uncontrolled form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h5>Name:</h5>
          <input type="text" ref={nameRef} required />
        </label>
        <div className="error">
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <label>
          <h5>Age:</h5>
          <input type="number" ref={ageRef} required />
        </label>
        <div className="error">
          {errors.age && <p className="error">{errors.age}</p>}
        </div>

        <label>
          <h5>Email:</h5>
          <input type="email" ref={emailRef} required />
        </label>
        <div className="error">
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <label>
          <h5>Password:</h5>
          <input type="password" ref={password1Ref} required />
        </label>
        <div className="error">
          {errors.password1 && <p className="error">{errors.password1}</p>}
        </div>

        <label>
          <h5>Confirm Password:</h5>
          <input type="password" ref={password2Ref} required />
        </label>
        <div className="error">
          {errors.password2 && <p className="error">{errors.password2}</p>}
        </div>

        <label htmlFor="gender">
          <h5>Gender:</h5>
          <select id="gender" ref={genderRef} required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <div className="error">
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>

        <label htmlFor="terms" className="terms">
          <input type="checkbox" id="terms" required />
          <div className="accept">Accept Terms and Conditions</div>
        </label>
        <div className="error">
          {errors.terms && <p className="error">{errors.terms}</p>}
        </div>

        <input type="submit"></input>
      </form>
    </>
  );
};

export default UncontrolledForm;
