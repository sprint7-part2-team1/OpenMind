import { useParams, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Modal from '../modal/Modal';
import useModal from '../modal/useModal';
import Header from '../../components/Header';
import styles from './IndividualFeed.module.css';
import Button from '../../components/Button/Button';
import BackButton from '../../components/Button/BackButton';
import HomeButton from '../../components/Button/HomeButton';
import FeedCardList from '../../components/FeedCardList/FeedCardList';

function IndividualFeed() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const { isOpen, openModal, closeModal } = useModal();
  const portalRoot = document.getElementById('portal-root');

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles['individualFeed-body']}>
      <Header subjectId={subjectId} />
      <div className={styles['feed-container']}>
        <FeedCardList subjectId={subjectId} />
      </div>
      <BackButton onClick={handleBackClick} />
      <HomeButton />
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
