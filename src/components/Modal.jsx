import React, { useEffect, useState } from "react";
import { createQuestion } from "../api/modalApi";
import Icon from './Icon/Icon'
import Styles from './Modal.module.css';

const TEAM = '7-1'

function Modal({onClose}) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [hasContent, setHasContent] = useState(false);
  const subjectId = '6716';

  const handleContentChange = (e) => {
    setContent(e.target.value);
  }

  const preventModalClose = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      subjectId,
      content,
      team: TEAM
    }
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      await createQuestion(formData)
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }
    setContent('');
  }

  useEffect(() => {
    if (content.trim() !== ''){
      setHasContent(true);
    } else {
      setHasContent(false);
    };
  },[content])
  
  return (
    <div className={Styles.modalOverlay} onClick={onClose}>
      <div className={Styles.modal} onClick={preventModalClose}>
        <header className={Styles.header}>
          <Icon iconName={"Messages"}/>
          <h2>질문을 작성하세요</h2>
          <button onClick={onClose} className={Styles.button}><Icon iconName={"Close"}/></button>
        </header>
        <section>

        </section>
        <form onSubmit={handleSubmit}>
          <textarea value={content} onChange={handleContentChange} placeholder="질문을 입력해주세요"></textarea>
          <button type="submit" disabled={isSubmitting || !hasContent}>질문 보내기</button>
          {submittingError?.message && <div>{submittingError.message}</div>}
        </form>
      </div>
    </div>
)
}

export default Modal;