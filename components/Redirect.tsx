'use client';
import { useEffect } from 'react';

const Redirect = ({ url }: { url: string }) => {
  console.log(url);
  useEffect(() => {
    window.location.replace(url);
  }, [url]);
  return null;
};

export default Redirect;
