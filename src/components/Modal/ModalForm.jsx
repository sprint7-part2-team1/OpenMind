import '../../global.css'; 
import Styles from './Modal.module.css';
import { useEffect, useState } from "react";
import { createQuestion } from "../../api/modalApi";

function ModalForm({  team, subjectId, onClose }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [hasContent, setHasContent] = useState(false);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      subjectId,
      content,
      team
    }

    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      await createQuestion(formData, subjectId)
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }
    setContent('');
  }

  const contentButtonOnOff = () => {
    if (content.trim() !== ''){
      setHasContent(true);
    } else {
      setHasContent(false);
    };
  }

  useEffect(() => {
    contentButtonOnOff();
  },[content])
  
  return (
  <form onSubmit={handleSubmit} className={Styles.form}>
    <textarea value={content} onChange={handleContentChange} placeholder="질문을 입력해주세요"></textarea>
    <button type="submit" disabled={isSubmitting || !hasContent}>질문 보내기</button>
    {submittingError?.message && <div>{submittingError.message}</div>}
  </form>
  );
}

export default ModalForm;