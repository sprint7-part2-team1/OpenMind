import styles from './FeedCard.module.css';
import ReactionButton from './ReactionButton';
import '../../global.css';
import formatTimeDiff from '../../utils/formatTimeDiff.js';

const FeedCard = ({
  answerStatus,
  questionContent,
  questionDate,
  userProfileImage,
  username,
  initialLikes,
  initialDislikes,
  answer,
  answerDate = answer?.createdAt,
  answerContent = answer?.content,
  answerRejected = answer?.isRejected,
  questionId,
  countUpdate,
}) => {
  const handleCountUpdate = (type, count) => {
    if (type === 'like') {
      countUpdate(questionId, { like: count });
    } else {
      countUpdate(questionId, { dislike: count });
    }
  };

  return (
    <div className={styles.feedcard}>
      <div className={styles['feedcard-status-box']}>
        {answerStatus === 'true' ? '답변 완료' : '미답변'}
      </div>
      <div className={styles['feedcard-question-header']}>
        <span className={styles['feedcard-question-label']}>질문 · &nbsp;</span>
        <span className={styles['feedcard-question-date']}>
          {formatTimeDiff(questionDate)}
        </span>
      </div>
      <div className={styles['feedcard-question-text']}>{questionContent}</div>
      {answerStatus === 'true' && (
        <div className={styles['feedcard-answer-box']}>
          <img
            src={userProfileImage}
            alt={`${username}'s profile`}
            className={styles['feedcard-user-image']}
          />
          <div className={styles['feedcard-answer-content']}>
            <div className={styles['feedcard-answer-content-header']}>
              <div className={styles['feedcard-user-name']}>{username}</div>
              <span className={styles['feedcard-answer-date']}>
                {formatTimeDiff(answerDate)}
              </span>
            </div>
            <div
              className={`${styles['feedcard-user-answer']} ${
                answerRejected ? styles['answer-rejected'] : ''
              }`}
            >
              {answerRejected ? '답변 거절' : answerContent}
            </div>
          </div>
        </div>
      )}
      <div className={styles.separator}></div>
      <div className={styles['feedcard-buttons']}>
        <ReactionButton
          type='like'
          initialCount={initialLikes}
          questionId={questionId}
          countUpdate={handleCountUpdate}
        />
        <ReactionButton
          type='dislike'
          initialCount={initialDislikes}
          questionId={questionId}
          countUpdate={handleCountUpdate}
        />
      </div>
    </div>
  );
};

export default FeedCard;
