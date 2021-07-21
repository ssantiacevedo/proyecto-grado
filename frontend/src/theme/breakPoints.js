import { useState, useEffect } from 'react';

export const mobileBreakpoint = 768;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export const MEDIA_SIZE = {
  xs: '320px',
  sm: '360px',
  s: '480px',
  md: '768px',
  l: '1024px',
};