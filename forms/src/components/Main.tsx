import { Link } from 'react-router-dom';
// import { FormData } from '../types';
// interface RootState {
//   form: {
//     hookData: FormData;
//   };
// }

const Main = () => {
  return (
    <>
      <div>Main</div>
      <Link to="/form1">Form 1</Link>
      <Link to="/form2">Form 2</Link>
    </>
  );
};

export default Main;
