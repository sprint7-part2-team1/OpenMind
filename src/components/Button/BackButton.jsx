import styles from './Button.module.css';

const BackButton = ({ onClick }) => {
  return <button className={styles.back} onClick={onClick}></button>;
};

export default BackButton;
