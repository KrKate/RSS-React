import * as yup from 'yup';

export const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required()
      .matches(/^[A-ZА-Я]/, 'First letter should be uppercase'),
    age: yup.number().required().positive().integer(),
    email: yup
      .string()
      .required()
      .email()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    gender: yup.string().required(),
    password1: yup
      .string()
      .required()
      .min(5, 'Weak password')
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
