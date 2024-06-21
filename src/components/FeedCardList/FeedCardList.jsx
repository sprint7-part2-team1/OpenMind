import FeedCard from '../FeedCard/FeedCard';
import styles from './FeedCardList.module.css';
import useFeedCardDetails from '../../hooks/useFeedCardDetails';
import NoQuestion from '../NoQuestion/NoQuestion';
import Messages from '../../assets/images/Messages.svg?react';
import Loading from '../Loading/Loading';

const FeedCardList = ({ subjectId, pageType }) => {
  const { questions, questionCount, isLoading, error, userInfo, setQuestions } =
    useFeedCardDetails(subjectId);

  const handleCountUpdate = (questionId, reaction) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, ...reaction } : question
      )
    );
  };

  const handleAnswerUpdate = (questionId, updatedAnswer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? { ...question, answer: updatedAnswer }
          : question
      )
    );
  };

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return !questionCount ? (
    <NoQuestion />
  ) : (
    <div className={styles.container}>
      <div className={styles.header}>
        <Messages className={styles.icon} />
        <span>{questionCount}개의 질문이 있습니다</span>
      </div>
      {questions.map((data) => (
        <FeedCard
          key={data.id}
          pageType={pageType}
          questionData={data}
          userInfo={userInfo}
          onCountUpdate={handleCountUpdate}
          onAnswerUpdate={handleAnswerUpdate}
        />
      ))}
    </div>
  );
};

export default FeedCardList;
