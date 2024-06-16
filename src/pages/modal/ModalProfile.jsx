import { useState } from 'react';
import { getSubjectDetail } from '../../api/subjects/subjectsApi';
import { useEffect } from 'react';
import style from './Modal.module.css';

function ModalProfile({ id }) {
  const [profileItems, setProfileItems] = useState({});

  const loadProfile = async () => {
    try {
      const results = await getSubjectDetail(id);
      setProfileItems(results);
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  useEffect(()=>{
    loadProfile();
  },[])

  return (
  <div className={style.profile}>
    <span className={style.to}>To.</span>
    <img className={style.profileImg} src={profileItems.imageSource} alt='Profileimage'></img>
    <span className={style.name}>{profileItems.name}</span>
  </div>
)
}

export default ModalProfile;