import styles from './Header.module.css';
import logo from '../assets/images/logo.png';
import '../global.css';

function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt='logo' />
      <img className={styles.profileImg} src={logo} alt='profile-img' />
    </header>
  );
}

export default Header;
