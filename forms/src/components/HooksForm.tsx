import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormData, country } from '../types';
import { schema } from '../yup/schema';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const HooksForm = () => {
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [enteredCountry, setEnteredCountry] = useState('');
  const [isCountryFocused, setIsCountryFocused] = useState(false);
  const [, setSelectedCountry] = useState('');

  const onSubmit = (data: FormData) => {
    console.log(JSON.stringify(data));
    setSubmitted(true);
  };

  const redirectToMain = () => {
    navigate('/');
  };

  const countries = useSelector((state: { countries: [] }) => state.countries);

  const filteredCountries = countries.filter((country: country) =>
    country.name.toLowerCase().includes(enteredCountry.toLowerCase())
  );
  const handleCountryClick = (countryName: string) => {
    setSelectedCountry(countryName);
    setEnteredCountry(countryName);
    setIsCountryFocused(false);
  };
  return (
    <>
      {submitted && redirectToMain()}
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

        <label htmlFor="country">
          <h5>Country:</h5>
          <input
            type="text"
            id="country"
            {...register('country')}
            value={enteredCountry}
            onChange={(e) => setEnteredCountry(e.target.value)}
            onFocus={() => setIsCountryFocused(true)}
            onBlur={() => {
              setTimeout(() => {
                setIsCountryFocused(false);
              }, 300);
            }}
          />
          <ul className={isCountryFocused ? '' : 'hidden'}>
            {filteredCountries.map((country: country) => (
              <li
                key={country.code}
                onClick={() => handleCountryClick(country.name)}
              >
                <span>{country.name}</span>
              </li>
            ))}
          </ul>
        </label>
        {/* {!isCountryFocused && (
            <div className="error">{errors.country && <p>{errors.country.message}</p>}</div>
          )} */}
        <input type="submit" disabled={!isValid || !isDirty} />
      </form>
    </>
  );
};
