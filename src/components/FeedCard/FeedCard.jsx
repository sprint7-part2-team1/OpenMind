import { useState } from 'react';
import styles from './FeedCard.module.css';
import ReactionButton from './ReactionButton';
import '../../global.css';
import formatTimeDiff from '../../utils/formatTimeDiff.js';
import KebabMenu from '../KebabMenu/KebabMenu.jsx';
import FeedCardAnswerInput from './FeedCardAnswerInput.jsx';
import { deleteAnswer } from '../../api/answers/answersApi.js';
import { postNewAnswer } from '../../api/questions/questionsApi.js';
import FeedCardAnswer from './FeedCardAnswer.jsx';

const FeedCard = ({
  pageType,
  questionData,
  userInfo,
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

  const { id: answerId, content: answerContent } = answer || {};

  const [currentAnswer, setCurrentAnswer] = useState(answerContent || '');
  const [currentAnswerStatus, setCurrentAnswerStatus] = useState(answer);
  const [isEditing, setIsEditing] = useState(false);

  const handleAnswerSubmit = (updatedAnswer) => {
    setCurrentAnswer(updatedAnswer.content);
    setCurrentAnswerStatus(true);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleReject = async (questionId) => {
    try {
      await postNewAnswer(questionId, 'reject', true);
      setCurrentAnswerStatus(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (answerId) => {
    try {
      const response = await deleteAnswer(answerId);
      if (response.ok) {
        setCurrentAnswerStatus(false);
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
          {currentAnswerStatus ? '답변 완료' : '미답변'}
        </div>
        {pageType === 'answer' && (
          <KebabMenu
            onEdit={handleEdit}
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
        currentAnswerStatus ? (
          isEditing ? (
            <FeedCardAnswerInput
              userInfo={userInfo}
              questionId={questionId}
              onSubmit={handleAnswerSubmit}
              answerStatus={true}
              answerId={answerId}
              initialAnswer={currentAnswer}
            />
          ) : (
            <FeedCardAnswer
              answer={answer}
              userInfo={userInfo}
            />
          )
        ) : (
          <FeedCardAnswerInput
          userInfo={userInfo}
            questionId={questionId}
            onSubmit={handleAnswerSubmit}
            answerStatus={false}
            answerId={answerId}
            initialAnswer={currentAnswer}
          />
        )
      ) : (
        currentAnswerStatus && (
          <FeedCardAnswer
            answer={answer}
            userInfo={userInfo}
          />
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
