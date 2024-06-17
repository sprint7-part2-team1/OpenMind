import style from './NoQuestionFeed.module.css';
import emptyQuestionIcon from '../../assets/images/emptyQuestionIcon.png';
import '../../global.css';
import Icon from '../Icon/Icon';

function NoQuestionFeed() {
  return (
    <>
      <div className={style.container}>
        <div className={style.container_header}>
          <Icon className={style.icon} iconName={'Messages'} />
          <p className={style.header_message}>아직 질문이 없습니다.</p>
        </div>
        <div className={style.empty_img_box}>
          <img
            className={style.empty_img}
            src={emptyQuestionIcon}
            alt='질문이 비어있는 아이콘'
          />
        </div>
      </div>
    </>
  );
}

export default NoQuestionFeed;
