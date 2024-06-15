import Style from './NoQuestionFeed.module.css';
import emptyQuestionIcon from '../../assets/images/emptyQuestionIcon.png';
import '../../global.css';
import Icon from '../Icon/Icon';

function NoQuestionFeed() {
  return (
    <>
      <div className={Style.container}>
        <div className={Style.container_header}>
          <Icon className={Style.icon} iconName={'Messages'} />
          <p className={Style.header_message}>아직 질문이 없습니다.</p>
        </div>
        <div className={Style.empty_img_box}>
          <img
            className={Style.empty_img}
            src={emptyQuestionIcon}
            alt='질문이 비어있는 아이콘'
          />
        </div>
      </div>
    </>
  );
}

export default NoQuestionFeed;
