import styles from './FeedCard.module.css';
import formatTimeDiff from '../../utils/formatTimeDiff';

const FeedCardAnswer = ({ answer, userInfo }) => {
  const {
    content: currentAnswer,
    isRejected: answerRejected,
    createdAt: answerDate,
  } = answer || {};

  const { name: username, imageSource: userProfileImage } = userInfo || {};

  return (
    <div className={styles['feedcard-answer-box']}>
      <img
        src={userProfileImage}
        alt={`${username}'s profile`}
        className={styles['feedcard-user-image']}
      />
      <div className={styles['feedcard-answer-content']}>
        <div className={styles['feedcard-answer-content-header']}>
          <div className={styles['feedcard-user-name']}>{username}</div>
          {!answerRejected && (
            <span className={styles['feedcard-answer-date']}>
              {formatTimeDiff(answerDate)}
            </span>
          )}
        </div>
        <div
          className={`${styles['feedcard-user-answer']} ${
            answerRejected ? styles['answer-rejected'] : ''
          }`}
        >
          {answerRejected ? '답변 거절' : currentAnswer}
        </div>
      </div>
    </div>
  );
};

export default FeedCardAnswer;
