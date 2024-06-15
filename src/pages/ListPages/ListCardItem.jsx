import styles from './ListCardItem.module.css'
import Icon from '../../components/Icon/Icon'
const ListCardItem = ({ id, name, imageSource, questionCount, createAt }) => {
  return (
    <div className={styles.container}>
        <img className={styles.img} src={`${imageSource}`} alt="프로필사진" />
        <div>{name}</div>
        <div className={styles.cardBottom}>
          <div className={styles.takeQs}>
            <Icon iconName={'Messages'}/>
            <span className={styles.takeQsText}>받은 질문</span>
          </div>
          <div>{`${questionCount}개`}</div>
        </div>
      
    </div>
  );
};

export default ListCardItem;