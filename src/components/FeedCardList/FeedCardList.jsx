import FeedCard from '../FeedCard/FeedCard';
import styles from './FeedCardList.module.css';

import useFeedCardDetails from '../../hooks/useFeedCardDetails';
import NoQuestionFeed from '../noQuestionFeed/NoQuestionFeed';
import Icon from '../Icon/Icon';

const FeedCardList = ({ subjectId, pageType }) => {
  const {
    questions,
    isLoading,
    error,
    userProfileImage,
    username,
    setQuestions,
  } = useFeedCardDetails(subjectId);

  const handleCountUpdate = (questionId, reaction) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, ...reaction } : question
      )
    );
  };

  if (isLoading) {
    return <div>로딩중입니다 헷...</div>;
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
          pageType={pageType}
        />
      ))}
    </div>
  );
};

export default FeedCardList;
