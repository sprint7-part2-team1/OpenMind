import { useState, useEffect } from 'react';
import styles from './ReactionButton.module.css';
import { postReaction } from '../../api/questions/questionsApi';
import LikeIcon from '../../assets/images/thumbs_up.svg?react';
import DislikeIcon from '../../assets/images/thumbs_down.svg?react';
import { postSupabaseReaction, getCancelledReactionCount } from '../../api/supabase/reactionApi';

const ReactionButton = ({
  type,
  initialCount = 0,
  questionId,
  countUpdate,
}) => {
  const [count, setCount] = useState(initialCount);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialCount = async () => {
      try {
        const cancelledReactionCount = await getCancelledReactionCount(
          questionId,
          type
        );
        setCount(initialCount - cancelledReactionCount);
      } catch (error) {
        console.error('Failed to fetch initial reaction count:', error);
      } finally {
        setIsLoading(false); // 로딩 상태 해제
      }
    };
    fetchInitialCount();
  }, [questionId, type, initialCount]);

  const handleClick = async () => {
    try {
      const newCount = isClicked ? count - 1 : count + 1;
      setCount(newCount);
      setIsClicked(!isClicked);

      if (isClicked) {
        await postSupabaseReaction(questionId, type);
      } else {
        await postReaction(questionId, type);
      }

      countUpdate(type, newCount);
    } catch (error) {
      console.error('Failed to handle reaction:', error);
    }
  };

  if (isLoading) {
    return null; // 로딩 중에는 아무것도 렌더링하지 않음
  }

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
