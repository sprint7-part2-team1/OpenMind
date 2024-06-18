import Header from '../../components/Header';
import FeedCardList from '../../components/FeedCardList/FeedCardList';
import ShareLink from './ShareLink';
import styles from './IndividualFeed.module.css';
import { useNavigate } from 'react-router-dom';
import useModal from '../modal/useModal';
import ReactDOM from 'react-dom';
import Modal from '../modal/Modal';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';

function IndividualFeed() {
  const { subjectId } = useParams(); // URL 파라미터에서 subjectId를 가져옴

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
