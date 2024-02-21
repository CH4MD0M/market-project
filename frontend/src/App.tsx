import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@routes/route';
import LoadingPage from '@pages/LoadingPage';

const App = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
