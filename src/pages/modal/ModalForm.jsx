import '../../global.css';
import style from './Modal.module.css';
import { useEffect, useState } from 'react';
import { createQuestion } from '../../api/subjects/subjectsApi';
import buttonStyle from '../../components/Button/Button.module.css';
import { useCreateQuestionMutation } from '../../queries/individualFedds';

function ModalForm({ subjectId, onClose }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [hasContent, setHasContent] = useState(false);

  const createQuestionMutation = useCreateQuestionMutation();

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      subjectId,
      content,
    };

    // try {
    //   setSubmittingError(null);
    //   setIsSubmitting(true);
    //   await createQuestion(formData, subjectId);
    //   setContent('');
    //   onClose();
    // } catch (error) {
    //   setSubmittingError(error);
    //   return;
    // } finally {
    //   setIsSubmitting(false);
    // }
    // useQuestionQuery(subjectId);
    try {
      await createQuestionMutation.mutateAsync({
        subjectId,
        content,
      });
      setContent('');
      onClose();
    } catch (error) {
      console.error('전송 실패', error);
    }
  };

  const contentButtonOnOff = () => {
    if (content.trim() !== '') {
      setHasContent(true);
    } else {
      setHasContent(false);
    }
  };

  useEffect(() => {
    contentButtonOnOff();
  }, [content]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (e.nativeEvent.isComposing === false) {
        e.preventDefault();
        handleSubmit(e);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <textarea
        className={style.textForm}
        value={content}
        onChange={handleContentChange}
        onKeyDown={handleKeyDown}
        placeholder='질문을 입력해주세요'
      ></textarea>
      <button
        className={`${style.button} ${buttonStyle.Button_SendQs}`}
        type='submit'
        disabled={createQuestionMutation.isPending.isPending || !hasContent}
      >
        질문 보내기
      </button>
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}

export default ModalForm;
