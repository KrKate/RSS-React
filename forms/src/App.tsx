import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HooksForm from './components/HooksForm';
import UncontrolledForm from './components/UncontrolledForm';
import Main from './components/Main';
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/form1" element={<UncontrolledForm />} />
          <Route path="/form2" element={<HooksForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
