import '../../global.css';
import styles from './Button.module.css';
import useWindowSize from '../../hooks/useWindowSize';

const Button = ({ text, onClick, isDisabled }) => {
  const { isMobile } = useWindowSize();
  const size = isMobile ? 'mobile' : '';

  let buttonText = text;
  switch (text) {
    case 'TakeQs':
      buttonText = `질문 받기`;
      break;
    case `GoQs`:
      buttonText = `질문하러 가기`;
      break;
    case `GoAs`:
      buttonText = `답변하러 가기`;
      break;
    case `WriteQs`:
      buttonText = isMobile ? '질문 작성' : '질문 작성하기';
      break;
    case `SendQs`:
      buttonText = `질문 보내기`;
      break;
    case `Delete`:
      buttonText = `삭제하기`;
      break;
    case `DoneAs`:
      buttonText = `답변완료`;
      break;
    case `DoneFix`:
      buttonText = `수정완료`;
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${styles.Button} ${styles[`Button_${text}`]} ${styles[size]}`}
      disabled={isDisabled}
    >
      {buttonText}
    </button>
  );
};

export default Button;
