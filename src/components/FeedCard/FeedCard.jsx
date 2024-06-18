import { useState } from 'react';
import styles from './FeedCard.module.css';
import ReactionButton from './ReactionButton';
import '../../global.css';
import formatTimeDiff from '../../utils/formatTimeDiff.js';
import KebabMenu from '../KebabMenu/KebabMenu.jsx';
import FeedCardAnswerInput from './FeedCardAnswerInput.jsx';
import {
  putAnswer,
  patchAnswer,
  deleteAnswer,
} from '../../api/answers/answersApi.js';

const FeedCard = ({
  pageType,
  questionData,
  userProfileImage,
  username,
  countUpdate,
}) => {
  const {
    id: questionId,
    content: questionContent,
    like: initialLikes,
    dislike: initialDislikes,
    createdAt: questionDate,
    answer: answer,
  } = questionData || {};

  const {
    id: answerId,
    content: answerContent,
    rejected: answerRejected,
    createdAt: answerDate,
  } = answer || {};

  const [currentAnswer, setCurrentAnswer] = useState(answerContent || '');
  const [currentAnswerStatus, setCurrentAnswerStatus] = useState(
    answer ? 'true' : 'false'
  );

  const handleAnswerSubmit = (updatedAnswer) => {
    setCurrentAnswer(updatedAnswer.content);
    setCurrentAnswerStatus('true');
  };

  const handleEdit = async (answerId, content) => {
    try {
      const response = await patchAnswer(answerId, { content });
      setCurrentAnswer(response.content);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (questionId) => {
    try {
      await putAnswer(questionId, currentAnswer, true);
      setCurrentAnswerStatus('true');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (answerId) => {
    try {
      const response = await deleteAnswer(answerId);
      if (response.ok) {
        setCurrentAnswerStatus('false');
        setCurrentAnswer('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.feedcard}>
      <div className={styles['feedcard-header']}>
        <div className={styles['feedcard-status-box']}>
          {currentAnswerStatus === 'true' ? '답변 완료' : '미답변'}
        </div>
        {pageType === 'answer' && (
          <KebabMenu
            onEdit={() => handleEdit(answerId, currentAnswer)}
            onReject={() => handleReject(questionId)}
            onDelete={() => handleDelete(answerId)}
          />
        )}
      </div>
      <div className={styles['feedcard-question-header']}>
        <span className={styles['feedcard-question-label']}>질문 · &nbsp;</span>
        <span className={styles['feedcard-question-date']}>
          {formatTimeDiff(questionDate)}
        </span>
      </div>
      <div className={styles['feedcard-question-text']}>{questionContent}</div>

      {pageType === 'answer' ? (
        currentAnswerStatus === 'true' ? (
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
                {answerRejected ? '답변 거절' : currentAnswer}
              </div>
            </div>
          </div>
        ) : (
          <FeedCardAnswerInput
            userProfileImage={userProfileImage}
            username={username}
            questionId={questionId}
            onSubmit={handleAnswerSubmit}
          />
        )
      ) : (
        currentAnswerStatus === 'true' && (
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
                {answerRejected ? '답변 거절' : currentAnswer}
              </div>
            </div>
          </div>
        )
      )}
      <div className={styles.separator}></div>
      <div className={styles['feedcard-buttons']}>
        <ReactionButton
          type='like'
          initialCount={initialLikes}
          questionId={questionId}
          countUpdate={countUpdate}
        />
        <ReactionButton
          type='dislike'
          initialCount={initialDislikes}
          questionId={questionId}
          countUpdate={countUpdate}
        />
      </div>
    </div>
  );
};

export default FeedCard;
