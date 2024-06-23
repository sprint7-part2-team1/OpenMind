import styles from './Button.module.css';
import { useNavigate } from 'react-router-dom';
const HomeButton = () => {

    const navigate = useNavigate();
    const handleHomeClick = ()=>{
        navigate('/')
    }
  return (
    <button className={styles.home} onClick={handleHomeClick}>
      <span>🏠</span>
    </button>
  );
};

export default HomeButton;
