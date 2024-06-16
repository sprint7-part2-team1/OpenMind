import FeedCardList from '../components/FeedCardList/FeedCardList';
import styles from './AnswerPage.module.css';
import useFeedCardDetails from '../hooks/useFeedCardDetails';
import NoQuestionFeed from '../components/NoQuestionFeed/NoQuestionFeed';
import { deleteAnswer, putAnswer } from '../api/answers/answersApi'


const AnswerPage = ({ subjectId }) => {
  const {
    questions,
    isLoading,
    error,
    setQuestions,
  } = useFeedCardDetails(subjectId);

  const handleAnswerSubmit = async (questionId, answerContent) => {
    try {
      const updatedAnswer = await putAnswer(questionId, answerContent, false);
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId ? { ...question, answer: updatedAnswer } : question
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (questionId, answerContent) => {
    try {
      const updatedAnswer = await putAnswer(questionId, answerContent, false);
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId ? { ...question, answer: updatedAnswer } : question
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (questionId) => {
    try {
      const updatedAnswer = await putAnswer(questionId, '', true);
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId ? { ...question, answer: updatedAnswer } : question
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (questionId) => {
    try {
      await deleteAnswer(questionId);
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId ? { ...question, answer: null } : question
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return questions.length === 0 ? (
    <NoQuestionFeed />
  ) : (
    <div className={styles.container}>
      <FeedCardList
        subjectId={subjectId}
        pageType={'answer'}
        onSubmit={handleAnswerSubmit}
        onEdit={handleEdit}
        onReject={handleReject}
        onDelete={handleDelete}
        
      />
    </div>
  );
};

export default AnswerPage;
