import styles from './Header.module.css';
import logo from '../assets/images/logo.png';
import ShareLink from '../pages/IndividualFeed/ShareLink';
import '../global.css';
import { getSubjectDetail } from '../api/subjects/subjectsApi';
import { useEffect, useState } from 'react';

function Header({ subjectId }) {
  const [userProfileImage, setUserProfileImage] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchSubjectDetail = async () => {
      try {
        const subjectDetail = await getSubjectDetail(subjectId);
        setUserProfileImage(subjectDetail.imageSource);
        setUserName(subjectDetail.name);
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
      <div className={styles['header-box']}>
        <p className={styles.name}>{userName}</p>
        <ShareLink />
      </div>
    </header>
  );
}

export default Header;
