import FeedCard from '../FeedCard/FeedCard';
import styles from './FeedCardList.module.css';
import Icon from '../Icon/Icon';
import {
  getSubjectDetail,
  getSubjectQuestions,
} from '../../api/subjects/subjectsApi';
import { useEffect, useState } from 'react';
import NoQuestionFeed from '../noQuestionFeed/NoQuestionFeed';

const FeedCardList = ({ subjectId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const subjectDetail = await getSubjectDetail(subjectId);
        setUsername(subjectDetail.name);
        setUserProfileImage(subjectDetail.imageSource);

        const questionData = await getSubjectQuestions(subjectId);
        setQuestions(questionData.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [subjectId]);

  if (loading) {
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
