import { useState } from 'react';
import styles from './FeedCard.module.css';
import ReactionButton from './ReactionButton';
import '../../global.css';
import formatTimeDiff from '../../utils/formatTimeDiff.js';

const FeedCard = ({
  pageType,
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
  onSubmit,
  onEdit,
  onReject,
  onDelete,
}) => {
  const [currentAnswer, setCurrentAnswer] = useState(answerContent || '');

  const handleAnswerChange = (event) => {
    setCurrentAnswer(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(questionId, currentAnswer);
  };

  const handleEdit = () => {
    onEdit(questionId, currentAnswer);
  };

  const handleReject = () => {
    onReject(questionId);
  };

  const handleDelete = () => {
    onDelete(questionId);
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

      {pageType === 'answer' ? (
        answerStatus === 'true' ? (
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
        ) : (
          <div className={styles['feedcard-answer-box']}>
            <img
              src={userProfileImage}
              alt={`${username}'s profile`}
              className={styles['feedcard-user-image']}
            />
            <div className={styles['feedcard-answer-content']}>
              <div className={styles['feedcard-answer-content-header']}>
                <div className={styles['feedcard-user-name']}>{username}</div>
              </div>
              <textarea
                value={currentAnswer}
                onChange={handleAnswerChange}
                placeholder='답변을 입력하세요'
                className={styles['feedcard-answer-input']}
              />
            </div>
            <button
              className={styles['feedcard-submit-button']}
              onClick={handleSubmit}
            >
              제출
            </button>
            <button onClick={handleEdit}>수정하기</button>
            <button onClick={handleReject}>거절하기</button>
            <button onClick={handleDelete}>삭제하기</button>
          </div>
        )
      ) : (
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
