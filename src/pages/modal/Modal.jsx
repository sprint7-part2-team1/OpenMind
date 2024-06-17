import '../../global.css'; 
import Icon from '../../components/Icon/Icon'
import styles from './Modal.module.css';
import ModalForm from './ModalForm';
import ModalProfile from './ModalProfile';

const TEAM = '7-1'
const subjectId = '6742';

function Modal({ onClose }) {

  const preventModalClose = (e) => {
    e.stopPropagation();
  };
  
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={preventModalClose}>
        <div className={styles.content}>
          <header className={styles.header}>
            <div className={styles.title}>
              <Icon iconName={"Messages"}/>
              <h2 className={styles.text}>질문을 작성하세요</h2>
            </div>
            <button onClick={onClose} className={styles.closeButton}><Icon iconName={"Close"}/></button>
          </header>
          <ModalProfile team={TEAM} id={subjectId}/>
          <ModalForm team={TEAM} subjectId={subjectId} onClose={onClose}/>
        </div>
      </div>
    </div>
)
}

export default Modal;