import { Link } from 'react-router-dom';
import { FormData } from '../types';
import { useSelector } from 'react-redux';
interface RootState {
  form: {
    hookData: FormData;
  };
}

const Main = () => {
  const formData = useSelector((state: RootState) => state.form.hookData);

  return (
    <>
      <div>Main</div>
      <Link to="/form1">Form 1</Link>
      <Link to="/form2">Form 2</Link>
      <div>{formData && formData.name}</div>
      <div>{formData && formData.email}</div>
    </>
  );
};

export default Main;
