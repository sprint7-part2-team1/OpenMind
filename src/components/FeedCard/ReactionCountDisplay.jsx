import styles from './ReactionCountDisplay.module.css';

const ReactionCountDisplay = ({ count }) => {
  return <span className={styles.count}>{count}</span>;
};

export default ReactionCountDisplay;