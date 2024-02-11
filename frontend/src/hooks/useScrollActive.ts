import { useCallback, useEffect, useState } from 'react';

export const useScrollActive = (threshold: number): boolean => {
  const [active, setActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const detectScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setActive(currentScrollY > threshold && currentScrollY > scrollY);
    setScrollY(currentScrollY);
  }, [scrollY, threshold]);

  useEffect(() => {
    window.addEventListener('scroll', detectScroll);
    return () => window.removeEventListener('scroll', detectScroll);
  }, [detectScroll]);

  return active;
};
