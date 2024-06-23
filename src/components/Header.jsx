import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../assets/images/logo.png';
import ShareLink from '../pages/IndividualFeed/ShareLink';
import { getSubjectDetail } from '../api/subjects/subjectsApi';

function Header({ subjectId }) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchSubjectDetail = async () => {
      try {
        const subjectDetail = await getSubjectDetail(subjectId);
        setUserInfo(subjectDetail);
      } catch (error) {
        console.error('Error fetching subject detail:', error);
      }
    };

    fetchSubjectDetail();
  }, [subjectId]);

  const { name: userName, imageSource: userProfileImage } = userInfo || {};

  return (
    <header className={styles.header}>
      <Link to='/' className={styles.header_right}>
        <img className={styles.logo} src={logo} alt='logo' />
      </Link>
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
