import '../../global.css';
import styles from './Button.module.css'

const Button = ({ text, size, onClick, isDisabled }) => {
  const content = text;
  switch (text) {
    case 'TakeQs':
      text = `질문 받기`;
      break;
    case `GoQs`:
      text = `질문하러 가기`;
      break;
    case `GoAs`:
      text = `답변하러 가기`;
      break;
    case `WriteQs`:
      if (size === 'mobile') {
        text = '질문 작성';
      } else {
        text = `질문 작성하기`;
      }
      break;
    case `SendQs`:
      text = `질문 보내기`;
      break;
    case `Delete`:
      text = `삭제하기`;
      break;
    case `DoneAs`:
      text = `답변완료`;
      break;
    case `DoneFix`:
      text = `수정완료`;
      break;
  }
  return (
    <button
      onClick={onClick}
      className={`${styles.Button} ${styles[`Button_${content}`]} ${styles[size]}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;