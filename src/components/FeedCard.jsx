import styles from './FeedCard.module.css';
import '../global.css';

const getTimeDiff = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;

  if (isNaN(date)) {
    return 'Invalid Date';
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (seconds < 60) {
    return `방금 전`;
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else if (days < 7) {
    return `${days}일 전`;
  } else if (weeks < 5) {
    return `${weeks}주 전`;
  } else {
    return date.toLocaleDateString();
  }
};


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
        <span className={styles['feedcard-question-date']}>{getTimeDiff(questionDate)}</span>
      </div>
      <div className={styles['feedcard-question-text']}>{question}</div>
      <div className={styles['feedcard-answer-box']}>
        <img
          src={userProfileImage}
          alt={`${username}'s profile`}
          className={styles['feedcard-user-image']}
        />
        <div className={styles['feedcard-answer-content']}>
          <div className={styles['feedcard-answer-content-header']}>
            <div className={styles['feedcard-user-name']}>{username}</div>
            <span className={styles['feedcard-answer-date']}>{getTimeDiff(answerDate)}</span>
          </div>
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
