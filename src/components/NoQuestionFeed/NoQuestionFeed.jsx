import styles from './NoQuestionFeed.module.css';
import emptyQuestionIcon from '../../assets/images/emptyQuestionIcon.png';
import '../../global.css';
import Icon from '../Icon/Icon';

function NoQuestionFeed() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_header}>
          <Icon className={styles.icon} iconName={'Messages'} />
          <p className={styles.header_message}>아직 질문이 없습니다.</p>
        </div>
        <div className={styles.empty_img_box}>
          <img
            className={styles.empty_img}
            src={emptyQuestionIcon}
            alt='질문이 비어있는 아이콘'
          />
        </div>
      </div>
    </>
  );
}

export default NoQuestionFeed;
