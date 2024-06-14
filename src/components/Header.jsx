import styles from './Header.module.css';
import logo from '../assets/images/logo.png';
import '../global.css';
import { getSubjectDetail } from '../api/subjects/subjectsApi';
import { useEffect, useState } from 'react';

function Header({ subjectId }) {
  const [userProfileImage, setUserProfileImage] = useState('');

  useEffect(() => {
    const fetchSubjectDetail = async () => {
      try {
        const subjectDetail = await getSubjectDetail(subjectId);
        setUserProfileImage(subjectDetail.imageSource);
      } catch (error) {
        console.error('Error fetching subject detail:', error);
      }
    };

    fetchSubjectDetail();
  }, [subjectId]);

  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt='logo' />
      <img
        className={styles.profileImg}
        src={userProfileImage}
        alt='profile-img'
      />
    </header>
  );
}

export default Header;
