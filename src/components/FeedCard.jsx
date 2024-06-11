import styles from './FeedCard.module.css';
import '../global.css';

const FeedCard = ({
  status,
  question,
  questionDate,
  userProfileImage,
  username,
  answerDate,
  answer,
}) => {
  return (
    <div className={styles.feedcard}>
      <div className={styles['feedcard-status-box']}>
        {status === 'true' ? '답변 완료' : '미답변'}
      </div>
      <div className={styles['feedcard-question-header']}>
        <span className={styles['feedcard-question-label']}>질문 · &nbsp;</span>
        <span className={styles['feedcard-date']}>{questionDate}</span>
      </div>
      <div className={styles['feedcard-question-text']}>{question}</div>
      <div className={styles['feedcard-answer-box']}>
        <img
          src={userProfileImage}
          alt={`${username}'s profile`}
          className={styles['feedcard-user-image']}
        />
        <div className={styles['feedcard-answer-content']}>
          <div className={styles['feedcard-user-name']}>{username}</div>
          <span className={styles['feedcard-date']}>{answerDate}</span>
          <div className={styles['feedcard-user-answer']}>{answer}</div>
        </div>
      </div>
      <div className={styles.separator}></div>
      <div className={styles['feedcard-buttons']}>
        <button className={styles['like-button']}>좋아요</button>
        <button className={styles['dislike-button']}>싫어요</button>
      </div>
    </div>
  );
};

export default FeedCard;
