import Header from '../../components/Header';
import FeedCardList from '../../components/FeedCardList/FeedCardList';
import styles from '../IndividualFeed/IndividualFeed.module.css';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { getSubjectQuestions } from '../../api/subjects/subjectsApi';
import { deleteQuestionDetail } from '../../api/questions/questionsApi';
import BackButton from '../../components/Button/BackButton';
import swal from 'sweetalert';
import { useState } from 'react';
import '../../assets/css/swal.css';
import HomeButton from '../../components/Button/HomeButton';

function AnswerFeed() {
  const { subjectId } = useParams();
  const [refreshKey, setRefreshKey] = useState(false);

  const deleteAllQuestions = async () => {
    const { results } = await getSubjectQuestions(subjectId);
    const questionForDelete = results.map((result) => result.id);
    swal(
      '질문을 모두 삭제할까요?',
      '받은 질문이 전체 삭제되며, \n 한번 삭제된 질문은 다시 복구 할 수 없습니다',
      'warning',
      {
        buttons: {
          삭제할래요: true,
          cancel: '더 고민해볼래요',
        },
      }
    ).then((value) => {
      if (value === '삭제할래요') {
        questionForDelete.map(async (id) => {
          await deleteQuestionDetail(id);
          setRefreshKey((prevKey) => !prevKey);
        });
      } else {
        // 취소 버튼을 눌렀을 때는 아무 동작도 하지 않습니다.
      }
    });
  };
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className={styles['individualFeed-body']}>
      <BackButton onClick={handleBackClick} />
      <HomeButton />
      <Header subjectId={subjectId} />
      <div className={styles['feed-container']}>
        <div className={styles.buttonBox}>
          <Button text='Delete' onClick={deleteAllQuestions} />
        </div>
        <FeedCardList
          key={refreshKey}
          subjectId={subjectId}
          pageType={'answer'}
        />
      </div>
    </div>
  );
}

export default AnswerFeed;
