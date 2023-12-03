import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UncontrolledForm from './components/UncontrolledForm';
import Main from './components/Main';
import { HooksForm } from './components/HooksForm';
import { Provider } from 'react-redux';
import { store } from './toolkitRedux/store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/form1" element={<UncontrolledForm />} />
            <Route path="/form2" element={<HooksForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
