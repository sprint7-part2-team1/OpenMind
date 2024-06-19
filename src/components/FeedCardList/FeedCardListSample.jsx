import React, { useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import FeedCard from '../FeedCard/FeedCard';
import styles from './FeedCardList.module.css';
import useFeedCardInfinityScroll from '../../hooks/useFeedCardInfinityScroll';
import NoQuestionFeed from '../NoQuestionFeed/NoQuestionFeed';
import Icon from '../Icon/Icon';

const FeedCardList = ({ subjectId, userProfileImage, username }) => {
  const { questions, isLoading, error, loadMoreQuestions, setQuestions } =
    useFeedCardInfinityScroll(subjectId);

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

  const loadMore = useCallback(() => {
    if (!isLoading && inView) {
      loadMoreQuestions();
    }
  }, [isLoading, inView, loadMoreQuestions]);

  React.useEffect(() => {
    loadMore();
  }, [inView, loadMore]);

  if (isLoading && questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return questions.length === 0 ? (
    <NoQuestionFeed />
  ) : (
    <div className={styles.container}>
      <div className={styles.header}>
        <Icon className={styles.icon} iconName={'Messages'} />
        <span>{questions.length}개의 질문이 있습니다</span>
      </div>
      {questions.map((data) => (
        <FeedCard
          key={data.id}
          questionContent={data.content}
          questionDate={data.createdAt}
          userProfileImage={userProfileImage}
          username={username}
          answerStatus={data.answer ? 'true' : 'false'}
          answer={data.answer}
          initialLikes={data.like}
          initialDislikes={data.dislike}
          questionId={data.id}
          countUpdate={handleCountUpdate}
        />
      ))}
      <div ref={ref} className={styles.loadMoreTrigger} />
    </div>
  );
};

export default FeedCardList;
