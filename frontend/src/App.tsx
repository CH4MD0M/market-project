import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

// Components
import LoadingPage from './pages/LoadingPage';
import { router } from './routes/route';

const App = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
