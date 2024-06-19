import React, { useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import FeedCard from '../FeedCard/FeedCard';
import styles from './FeedCardList.module.css';
import useFeedCardInfinityScroll from '../../hooks/useFeedCardInfinityScroll';
import NoQuestion from '../NoQuestion/NoQuestion';
import Icon from '../Icon/Icon';

const FeedCardList = ({ subjectId, pageType }) => {
  const {
    count,
    questions,
    isLoading,
    error,
    loadMoreQuestions,
    setQuestions,
  } = useFeedCardInfinityScroll(subjectId);

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const handleCountUpdate = (questionId, reaction) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, ...reaction } : question
      )
    );
  };

  console.log(subjectId);
  const loadMore = useCallback(() => {
    if (!isLoading && inView) {
      loadMoreQuestions();
    }
  }, [isLoading, inView, loadMoreQuestions]);

  React.useEffect(() => {
    loadMore();
  }, [inView, loadMore]);

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
        <span>{questions.length}개의 질문이 있습니다</span>
      </div>
      {questions.map((data) => (
        <FeedCard
          key={data.id}
          pageType={pageType}
          questionData={data}
          userProfileImage={data.userProfileImage}
          username={data.username}
          countUpdate={handleCountUpdate}
        />
      ))}
      <div ref={ref} className={styles.loadMoreTrigger} />
    </div>
  );
};

export default FeedCardList;
