import Header from '../../components/Header';
import FeedCardList from '../../components/FeedCardList/FeedCardList';
import ShareLink from './ShareLink';
import styles from './IndividualFeed.module.css';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../modal/useModal';
import ReactDOM from 'react-dom';
import { Modal } from '../modal/Modal';

function IndividualFeed() {
  // const navigate = useNavigate();

  // const handleMoveModal = () => {
  //   navigate(`/question/${SubjectResult.id}`);
  // }

  const { isOpen, openModal, closeModal } = useModal();
  const portalRoot = document.getElementById('portal-root');

  return (
    <div>
      <Header subjectId='6692' />
      <div className={styles['feed-container']}>
        <FeedCardList subjectId='6692' />
      </div>
      <button onClick={openModal}>질문하러 가기</button>
      {isOpen &&
        ReactDOM.createPortal(<Modal onClose={closeModal} />, portalRoot)}
    </div>
  );
}

export default IndividualFeed;
