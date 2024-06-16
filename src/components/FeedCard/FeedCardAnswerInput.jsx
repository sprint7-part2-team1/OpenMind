import { useState } from 'react';
import KebabMenu from '../KebabMenu/KebabMenu';
import styles from './FeedCardAnswerInput.module.css';

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

  const handleEdit = () => {
    onEdit(currentAnswer);
  };

  const handleReject = () => {
    onReject();
  };

  const handleDelete = () => {
    onDelete();
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
            <KebabMenu
              onEdit={handleEdit}
              onReject={handleReject}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
      <textarea
        value={currentAnswer}
        onChange={handleAnswerChange}
        placeholder='답변을 입력하세요'
        className={styles['feedcard-answer-input']}
      />
      <button
        className={styles['feedcard-submit-button']}
        onClick={handleSubmit}
      >
        답변 완료
      </button>
    </div>
  );
};

export default FeedCardAnswerInput;
