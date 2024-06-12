import { useState } from 'react';
import styles from './ReactionButton.module.css';
import Icon from '../Icon/Icon';

const ReactionButton = ({ type, initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <button className={styles['button-reaction']} onClick={handleClick}>
      <Icon
        className={styles.icon}
        iconName={type === 'like' ? 'thumbs_up' : 'thumbs_down'}
      />
      <span className={styles.text}>
        {type === 'like' ? '좋아요' : '싫어요'}
      </span>
      <span className={styles.count}>{count}</span>
    </button>
  );
};

export default ReactionButton;
