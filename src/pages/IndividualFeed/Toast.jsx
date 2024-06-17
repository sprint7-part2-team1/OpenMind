import { useEffect } from 'react';
import styles from './Toast.module.css';

function Toast({ message, duration, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <div className={styles.toast}>{message}</div>;
}

export default Toast;
