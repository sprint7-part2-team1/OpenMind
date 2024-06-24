import loadingGif from '../../assets/images/loading3.svg';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <img src={loadingGif} alt='Loading...' />
      </div>
    </div>
  );
};

export default Loading;
