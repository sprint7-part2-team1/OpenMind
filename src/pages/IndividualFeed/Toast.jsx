import { useEffect } from 'react';

function Toast({ message, duration, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <div className='toast'>{message}</div>;
}

export default Toast;
