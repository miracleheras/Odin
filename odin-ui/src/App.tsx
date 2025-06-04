import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages';
import { PATH } from './constants';

export const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.HOME} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

