import { useState, useEffect } from 'react';
import styles from './FeedCardAnswerInput.module.css';
import Button from '../Button/Button';
import { postNewAnswer } from '../../api/questions/questionsApi';
import { patchAnswer } from '../../api/answers/answersApi';

const FeedCardAnswerInput = ({
  initialAnswer = '',
  userProfileImage,
  username,
  questionId,
  onSubmit,
  answerStatus,
  answerId,
}) => {
  const [currentAnswer, setCurrentAnswer] = useState(initialAnswer);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (answerStatus) {
      setIsButtonDisabled(currentAnswer === initialAnswer);
    } else {
      setIsButtonDisabled(currentAnswer.trim() === '');
    }
  }, [currentAnswer, answerStatus, initialAnswer]);

  const handleAnswerChange = (e) => {
    setCurrentAnswer(e.target.value);
  };

  const handleAnswerSubmit = async () => {
    try {
      let response;
      if (answerStatus) {
        response = await patchAnswer(answerId, currentAnswer, false);
      } else {
        response = await postNewAnswer(questionId, currentAnswer, false);
      }
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
          <Button
            text={answerStatus ? 'DoneFix' : 'DoneAs'}
            onClick={handleAnswerSubmit}
            isDisabled={isButtonDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default FeedCardAnswerInput;
