import { useState, useEffect, useRef } from 'react';
import useFeedCardInfinityScroll from '../../hooks/useFeedCardInfinityScroll';
import FeedCard from '../FeedCard/FeedCard';
import styles from './FeedCardList.module.css';
import NoQuestion from '../NoQuestion/NoQuestion';
import Icon from '../Icon/Icon';

const FeedCardList = ({ subjectId, pageType }) => {
  const {
    questions,
    setQuestions,
    questionCount,
    isLoading,
    error,
    userInfo,
    loadMoreQuestions,
  } = useFeedCardInfinityScroll(subjectId);

  const [isFetching, setIsFetching] = useState(false);

  const endOfListRef = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;

    // Additional fetch logic here
    loadMoreQuestions();

    setIsFetching(false);
  }, [isFetching]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading ||
      !endOfListRef.current
    ) {
      return;
    }

    setIsFetching(true);
  };

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

  if (isLoading && questions.length === 0) {
    return <div>로딩중입니다 헷...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return questions.length === 0 ? (
    <NoQuestion />
  ) : (
    <div className={styles.container}>
      <div className={styles.header}>
        <Icon className={styles.icon} iconName={'Messages'} />
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
      <div ref={endOfListRef} className={styles.endOfList} />
      {isLoading && <div>로딩 중...</div>}
    </div>
  );
};

export default FeedCardList;
