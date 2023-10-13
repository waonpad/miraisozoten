import { useState, useEffect } from 'react';

export const Hooks = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage('Hello, world!');
  }, []);

  return <div>{message}</div>;
};
