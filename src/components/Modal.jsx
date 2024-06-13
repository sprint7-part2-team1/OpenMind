import React from "react";
import Icon from './Icon/Icon'
import Styles from './Modal.module.css';

function Modal({onClose}) {
  return (
    <div className={Styles.modalOverlay} onClick={onClose}>
      <div className={Styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={Styles.header}>
          <Icon iconName={"Messages"}/>
          <h2>질문을 작성하세요</h2>
          <button onClick={onClose} className={Styles.button}><Icon iconName={"Close"}/></button>
        </header>
        <form>
          <textarea placeholder="질문을 입력해주세요"></textarea>
          <button type="submit">질문 보내기</button>
        </form>
      </div>
    </div>
)
}

export default Modal;