import { useEffect } from 'react';
import { useLocation, Location } from 'react-router-dom';

const ScrollToTop = () => {
  const location: Location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
