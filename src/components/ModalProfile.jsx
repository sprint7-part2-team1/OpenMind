import { useState } from 'react';
import { getSubjectDetail } from '../api/subjects/subjectsApi';
import { useEffect } from 'react';
import '../global.css';
import styles from './ModalProfile.module.css';

function ModalProfile() {
  const [profileItems, setProfileItems] = useState({});

  const loadProfile = async () => {
    try {
      const results = await getSubjectDetail(6767);
      setProfileItems(results);
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  useEffect(()=>{
    loadProfile();
  },[])

  return (
  <div className={styles.profile}>
    <span className={styles.to}>To.</span>
    <img className={styles.profileImg} src={profileItems.imageSource} alt='Profileimage'></img>
    <span className={styles.name}>{profileItems.name}</span>
  </div>
)
}

export default ModalProfile;