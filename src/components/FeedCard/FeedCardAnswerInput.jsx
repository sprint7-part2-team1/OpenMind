import { useState } from 'react';
import KebabMenu from '../KebabMenu/KebabMenu';
import styles from './FeedCardAnswerInput.module.css';
import Button from '../Button/Button';

const FeedCardAnswerInput = ({
  initialAnswer = '',
  onSubmit,
  onEdit,
  onReject,
  onDelete,
  userProfileImage,
  username,
}) => {
  const [currentAnswer, setCurrentAnswer] = useState(initialAnswer);

  const handleAnswerChange = (event) => {
    setCurrentAnswer(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(currentAnswer);
  };

  return (
    <div className={styles.feedcardAnswerInput}>
      <div className={styles.header}>
        <img
          src={userProfileImage}
          alt={`${username}'s profile`}
          className={styles['feedcard-user-image']}
        />
        <div className={styles['feedcard-answer-content']}>
          <div className={styles['feedcard-answer-content-header']}>
            <div className={styles['feedcard-user-name']}>{username}</div>
            <textarea
              value={currentAnswer}
              onChange={handleAnswerChange}
              placeholder='답변을 입력하세요'
              className={styles['feedcard-answer-input']}
            />
          </div>
          <Button text={'DoneAs'} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default FeedCardAnswerInput;
