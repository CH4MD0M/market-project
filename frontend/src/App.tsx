import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@routes/route';
import LoadingPage from '@pages/LoadingPage';
import { useLoginCheck } from './hooks/useLoginCheck';

const App = () => {
  useLoginCheck();

  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
