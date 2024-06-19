import Header from '../../components/Header';
import FeedCardList from '../../components/FeedCardList/FeedCardList';
import styles from '../IndividualFeed/IndividualFeed.module.css';
import { useParams } from 'react-router-dom';

function AnswerFeed() {
  const { subjectId } = useParams();

  return (
    <div className={styles['individualFeed-body']}>
      <Header subjectId={subjectId} />
      <div className={styles['feed-container']}>
        <FeedCardList subjectId={subjectId} pageType={'answer'} />
      </div>
    </div>
  );
}

export default AnswerFeed;
