import '../../global.css'; 
import Icon from '../../components/Icon/Icon'
import Style from './Modal.module.css';
import ModalForm from './ModalForm';
import ModalProfile from './ModalProfile';

const TEAM = '7-1'
const subjectId = '6742';

function Modal({ onClose }) {

  const preventModalClose = (e) => {
    e.stopPropagation();
  };
  
  return (
    <div className={Style.modalOverlay} onClick={onClose}>
      <div className={Style.modal} onClick={preventModalClose}>
        <div className={Style.content}>
          <header className={Style.header}>
            <div className={Style.title}>
              <Icon iconName={"Messages"}/>
              <h2 className={Style.text}>질문을 작성하세요</h2>
            </div>
            <button onClick={onClose} className={Style.button}><Icon iconName={"Close"}/></button>
          </header>
          <ModalProfile team={TEAM} id={subjectId}/>
          <ModalForm team={TEAM} subjectId={subjectId} onClose={onClose}/>
        </div>
      </div>
    </div>
)
}

export default Modal;