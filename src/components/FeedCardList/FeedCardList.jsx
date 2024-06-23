import { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './FeedCardList.module.css';
import FeedCard from '../FeedCard/FeedCard';
import useFeedCardInfinityScroll from '../../hooks/useFeedCardInfinityScroll';
import NoQuestion from '../NoQuestion/NoQuestion';
import Messages from '../../assets/images/Messages.svg?react';
import Loading from '../Loading/Loading';

const FeedCardList = ({ subjectId, pageType }) => {
  const {
    questions,
    questionCount,
    isLoading,
    error,
    userInfo,
    loadMoreQuestions,
    setQuestions,
  } = useFeedCardInfinityScroll(subjectId);

  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

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

  const loadMore = useCallback(() => {
    if (!isLoading && inView) {
      loadMoreQuestions();
    }
  }, [isLoading, inView, loadMoreQuestions]);

  useEffect(() => {
    loadMore();
  }, [inView]);

  if (isLoading && questions.length === 0) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return questionCount === 0 ? (
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
      <div ref={ref} className={styles.loadMoreTrigger} />
    </div>
  );
};

export default FeedCardList;
