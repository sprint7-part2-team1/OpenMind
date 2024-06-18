import '../../global.css';
import Icon from '../../components/Icon/Icon';
import styles from './Modal.module.css';
import ModalForm from './ModalForm';
import ModalProfile from './ModalProfile';

function Modal({ onClose, subjectId }) {
  const preventModalClose = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={preventModalClose}>
        <div className={styles.content}>
          <header className={styles.header}>
            <div className={styles.title}>
              <Icon iconName={'Messages'} />
              <h2 className={styles.text}>질문을 작성하세요</h2>
            </div>
            <button onClick={onClose} className={styles.closeButton}>
              <Icon iconName={'Close'} />
            </button>
          </header>
          <ModalProfile id={subjectId} />
          <ModalForm subjectId={subjectId} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}

export default Modal;
