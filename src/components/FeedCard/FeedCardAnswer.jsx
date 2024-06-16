import styles from './FeedCard.module.css';
import formatTimeDiff from '../../utils/formatTimeDiff.js';

const FeedCardAnswer = ({
  answerStatus,
  userProfileImage,
  username,
  answer,
  answerDate = answer?.createdAt,
  answerContent = answer?.content,
  answerRejected = answer?.isRejected,
}) => {
  answerStatus === 'true' && (
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
  );
};

export default FeedCardAnswer;
