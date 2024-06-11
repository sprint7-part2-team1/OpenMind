import headerImg from '../assets/images/headerImg.png';
import styles from './Header.module.css';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt='logo' />
    </header>
  );
}

export default Header;
