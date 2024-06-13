import '../../global.css'; 
import Icon from '../Icon/Icon'
import Styles from './Modal.module.css';
import ModalForm from './ModalForm';

const TEAM = '7-1'
const subjectId = '6742';

function Modal({ onClose }) {

  const preventModalClose = (e) => {
    e.stopPropagation();
  };
  
  return (
    <div className={Styles.modalOverlay} onClick={onClose}>
      <div className={Styles.modal} onClick={preventModalClose}>
        <div className={Styles.content}>
          <header className={Styles.header}>
            <Icon iconName={"Messages"}/>
            <h2>질문을 작성하세요</h2>
            <button onClick={onClose} className={Styles.button}><Icon iconName={"Close"}/></button>
          </header>
          <section>

          </section>
          <ModalForm team={TEAM} subjectId={subjectId} onClose={onClose}/>
        </div>
      </div>
    </div>
)
}

export default Modal;