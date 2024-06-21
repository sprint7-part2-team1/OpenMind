import Header from '../../components/Header';
import FeedCardList from '../../components/FeedCardList/FeedCardList';
import styles from '../IndividualFeed/IndividualFeed.module.css';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { getSubjectQuestions } from '../../api/subjects/subjectsApi';
import { deleteQuestionDetail } from '../../api/questions/questionsApi';
import swal from 'sweetalert';

function AnswerFeed() {
  const { subjectId } = useParams();

  const deleteAllQuestions = async () => {
    const { results } = await getSubjectQuestions(subjectId);
    const questionForDelete = results.map((result) => result.id);
    swal('질문 목록 전체를 삭제합니다.', '삭제할까요?', 'warning', {
      buttons: {
        OK: true,
        cancel: '취소',
      },
    }).then((value) => {
      if (value === 'OK') {
        questionForDelete.map(async (id) => {
          await deleteQuestionDetail(id);
        });
      } else {
        // 취소 버튼을 눌렀을 때는 아무 동작도 하지 않습니다.
      }
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
