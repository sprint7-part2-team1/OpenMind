import { useState } from 'react';
import styles from './FeedCardAnswerInput.module.css';
import Button from '../Button/Button';
import { postNewAnswer } from '../../api/questions/questionsApi';

const FeedCardAnswerInput = ({
  initialAnswer = '',
  userProfileImage,
  username,
  questionId,
  onSubmit,
}) => {
  const [currentAnswer, setCurrentAnswer] = useState(initialAnswer);

  const handleAnswerChange = (e) => {
    setCurrentAnswer(e.target.value);
  };

  const handleAnswerSubmit = async () => {
    try {
      const response = await postNewAnswer(questionId, currentAnswer, false);
      onSubmit(response);
    } catch (error) {
      console.error(error);
    }
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
          <Button text={'DoneAs'} onClick={handleAnswerSubmit} />
        </div>
      </div>
    </div>
  );
};

export default FeedCardAnswerInput;
