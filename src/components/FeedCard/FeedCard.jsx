import { useState, useEffect } from 'react';
import styles from './FeedCard.module.css';
import ReactionButton from './ReactionButton';
import '../../global.css';
import formatTimeDiff from '../../utils/formatTimeDiff.js';
import KebabMenu from '../KebabMenu/KebabMenu.jsx';
import FeedCardAnswerInput from './FeedCardAnswerInput.jsx';
import { deleteAnswer, patchAnswer } from '../../api/answers/answersApi.js';
import { postNewAnswer } from '../../api/questions/questionsApi.js';
import FeedCardAnswer from './FeedCardAnswer.jsx';
import { getCancelledReactionCount } from './reactionApi.js';

const FeedCard = ({
  pageType,
  questionData,
  userInfo,
  onCountUpdate,
  onAnswerUpdate,
}) => {
  const {
    id: questionId,
    content: questionContent,
    like: initialLike,
    dislike: initialDislike,
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
    onAnswerUpdate(questionId, updatedAnswer);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleReject = async (questionId) => {
    try {
      if (currentAnswerStatus) {
        await patchAnswer(answerId, '거절', true);
      } else {
        await postNewAnswer(questionId, '거절', true);
      }
      setCurrentAnswerStatus(true);
      setCurrentAnswer('거절');
      onAnswerUpdate(questionId, {
        id: answerId,
        content: '거절',
        isRejected: true,
      });
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
        onAnswerUpdate(questionId, null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [initialTotalLikeCount, setInitialTotalLikeCount] =
    useState(initialLike);
  const [initialTotalDislikeCount, setInitialTotalDislikeCount] =
    useState(initialDislike);

  useEffect(() => {
    const fetchInitialCounts = async () => {
      try {
        const cancelledLikeCount = await getCancelledReactionCount(
          questionId,
          'like'
        );
        setInitialTotalLikeCount(initialLike - cancelledLikeCount);

        const cancelledDislikeCount = await getCancelledReactionCount(
          questionId,
          'dislike'
        );
        setInitialTotalDislikeCount(initialDislike - cancelledDislikeCount);
      } catch (error) {
        console.error('Failed to fetch initial counts:', error);
      }
    };

    if (initialTotalLikeCount === null && initialTotalDislikeCount === null) {
      fetchInitialCounts();
    }
  }, [questionId]);

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
            <FeedCardAnswer answer={answer} userInfo={userInfo} />
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
          <FeedCardAnswer answer={answer} userInfo={userInfo} />
        )
      )}
      <div className={styles.separator}></div>
      <div className={styles['feedcard-buttons']}>
        <ReactionButton
          type='like'
          initialCount={initialTotalLikeCount}
          questionId={questionId}
          countUpdate={(type, newCount) =>
            onCountUpdate(questionId, 'like', newCount)
          }
        />
        <ReactionButton
          type='dislike'
          initialCount={initialTotalDislikeCount}
          questionId={questionId}
          countUpdate={(type, newCount) =>
            onCountUpdate(questionId, 'dislike', newCount)
          }
        />
      </div>
    </div>
  );
};

export default FeedCard;
