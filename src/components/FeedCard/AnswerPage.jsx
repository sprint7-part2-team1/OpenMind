import FeedCard from '../../components/FeedCard/FeedCard';
import styles from './AnswerPage.module.css';
import Icon from '../../components/Icon/Icon';
import { getSubjectQuestions } from '../../api/subjects/subjectsApi';
import { useEffect, useState } from 'react';


const AnswerPage = ({ subjectId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionData = await getSubjectQuestions(subjectId);
        setQuestions(questionData.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subjectId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Icon className={styles.icon} iconName={'Messages'} />
        <span>{questions.length}개의 질문이 있습니다</span>
      </div>
      {questions.map((data) => (
        <FeedCard
          key={data.id}
          question={data.content}
          questionDate={data.createdAt}
          userProfileImage={'path_to_profile_image.jpg'}
          username={data.id}
          answerStatus={data.answer}
        />
      ))}
    </div>
  );
};

export default AnswerPage;