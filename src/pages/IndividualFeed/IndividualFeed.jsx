import Header from '../../components/Header';
import FeedCardList from '../../components/FeedCardList/FeedCardList';
import styles from './IndividualFeed.module.css';
import useModal from '../modal/useModal';
import ReactDOM from 'react-dom';
import Modal from '../modal/Modal';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';

function IndividualFeed() {
  const { subjectId } = useParams();

  const { isOpen, openModal, closeModal } = useModal();
  const portalRoot = document.getElementById('portal-root');

  return (
    <div className={styles['individualFeed-body']}>
      <Header subjectId={subjectId} />
      <div className={styles['feed-container']}>
        <FeedCardList subjectId={subjectId} />
      </div>

      <Button text='WriteQs' onClick={openModal} isDisabled={false} />
      {isOpen &&
        ReactDOM.createPortal(
          <Modal onClose={closeModal} subjectId={subjectId} />,
          portalRoot
        )}
    </div>
  );
}

export default IndividualFeed;
