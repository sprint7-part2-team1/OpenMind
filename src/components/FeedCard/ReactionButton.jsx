import { useState } from 'react';
import styles from './ReactionButton.module.css';
import Icon from '../Icon/Icon';
import { postReaction } from '../../api/questions/questionsApi';
const ReactionButton = ({
  type,
  initialCount = 0,
  questionId,
  countUpdate,
}) => {
  const [count, setCount] = useState(initialCount);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async () => {
    try {
      if (isClicked) {
        setCount(count - 1);
        setIsClicked(false);
        await postReaction(questionId, type);
      } else {
        setCount(count + 1);
        setIsClicked(true);
        await postReaction(questionId, type);
      }
      countUpdate(type, isClicked ? count - 1 : count + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className={`${styles['button-reaction']} ${
        isClicked ? styles['button-active'] : ''
      }`}
      onClick={handleClick}
    >
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
