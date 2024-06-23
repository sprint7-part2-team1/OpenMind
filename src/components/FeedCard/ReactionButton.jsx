import { useState, useEffect } from 'react';
import styles from './ReactionButton.module.css';
import { postReaction } from '../../api/questions/questionsApi';
import LikeIcon from '../../assets/images/thumbs_up.svg?react';
import DislikeIcon from '../../assets/images/thumbs_down.svg?react';
import {
  postSupabaseReaction,
  removeSupabaseReaction,
  getReactionCount,
  getCancelledReactionCount,
} from './reactionApi';

const ReactionButton = ({
  type,
  initialCount = 0,
  questionId,
  userId,
  countUpdate,
}) => {
  const [count, setCount] = useState(initialCount);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      const reactionCount = await getReactionCount(questionId, type);
      const cancelledReactionCount = await getCancelledReactionCount(
        questionId,
        type
      );
      setCount(reactionCount - cancelledReactionCount);
    };
    fetchCount();
  }, [questionId, type]);

  const handleClick = async () => {
    try {
      if (isClicked) {
        setCount(count - 1);
        setIsClicked(false);
        await removeSupabaseReaction(questionId, type, userId);
        await postReaction(questionId, type); // 기존 API 호출
      } else {
        setCount(count + 1);
        setIsClicked(true);
        await postSupabaseReaction(questionId, type, userId);
        await postReaction(questionId, type); // 기존 API 호출
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
      {type === 'like' ? (
        <LikeIcon
          className={`${styles.icon} ${isClicked ? styles['icon-active'] : ''}`}
        />
      ) : (
        <DislikeIcon
          className={`${styles.icon} ${isClicked ? styles['icon-active'] : ''}`}
        />
      )}

      <span className={styles.count}>{count}</span>
    </button>
  );
};

export default ReactionButton;
