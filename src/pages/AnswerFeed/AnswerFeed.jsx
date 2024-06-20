import Header from '../../components/Header';
import FeedCardList from '../../components/FeedCardList/FeedCardList';
import styles from '../IndividualFeed/IndividualFeed.module.css';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { getSubjectQuestions } from '../../api/subjects/subjectsApi';
import { deleteQuestionDetail } from '../../api/questions/questionsApi';

function AnswerFeed() {
  const { subjectId } = useParams();

  const deleteAllQuestions = async () => {
    const { results } = await getSubjectQuestions(subjectId);
    const questionForDelete = results.map((result) => result.id);
    questionForDelete.map(async (id) => {
      await deleteQuestionDetail(id);
    });
  };

  return (
    <div className={styles['individualFeed-body']}>
      <Header subjectId={subjectId} />
      <div className={styles['feed-container']}>
        <div className={styles.buttonBox}>
          <Button text='Delete' onClick={deleteAllQuestions} />
        </div>
        <FeedCardList subjectId={subjectId} pageType={'answer'} />
      </div>
    </div>
  );
}

export default AnswerFeed;
