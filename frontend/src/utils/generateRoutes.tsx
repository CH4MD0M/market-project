import { Route } from 'react-router-dom';
import { IRoute } from '@/types/route';

export const generateRoutes = (routes: IRoute[]): JSX.Element[] => {
  return routes.map(({ path, element }) => {
    return <Route key={path} path={path} element={element} />;
  });
};
