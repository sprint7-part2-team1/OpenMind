import { useState } from 'react';
import { getSubjectDetail } from '../../api/subjects/subjectsApi';
import { useEffect } from 'react';
import '../../global.css';
import style from './Modal.module.css';

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
  <div className={style.profile}>
    <span className={style.to}>To.</span>
    <img className={style.profileImg} src={profileItems.imageSource} alt='Profileimage'></img>
    <span className={style.name}>{profileItems.name}</span>
  </div>
)
}

export default ModalProfile;