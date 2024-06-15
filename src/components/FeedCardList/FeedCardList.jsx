import FeedCard from '../FeedCard/FeedCard';
import styles from './FeedCardList.module.css';
import useFeedCardDetails from '../../hooks/useFeedCardDetails';
import NoQuestionFeed from '../NoQuestionFeed/NoQuestionFeed';
import Icon from '../Icon/Icon';

const FeedCardList = ({ subjectId }) => {
  const { questions, isLoading, error, userProfileImage, username } =
    useFeedCardDetails(subjectId);

  if (isLoading) {
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
        />
      ))}
    </div>
  );
};

export default FeedCardList;
