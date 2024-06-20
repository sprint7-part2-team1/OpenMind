import styles from './Button.module.css';

const BackButton = ({ onClick }) => {
  return (
    <button className={styles.back} onClick={onClick}>
      <span>👈</span>
    </button>
  );
};

export default BackButton;
