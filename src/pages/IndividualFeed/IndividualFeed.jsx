import Header from '../../components/Header';
import FeedCardList from '../../components/FeedCardList/FeedCardList';
import ShareLink from './ShareLink';
import styles from './IndividualFeed.module.css';

function IndividualFeed() {
  return (
    <div>
      <Header subjectId='6692' />
      <div className={styles['feed-container']}>
        <FeedCardList subjectId='6692' />
      </div>
    </div>
  );
}

export default IndividualFeed;
