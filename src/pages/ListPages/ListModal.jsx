import { useEffect, useState } from 'react';
import styles from './ListModal.module.css';
import { getSubjectDetail } from '../../api/subjects/subjectsApi';
import { useNavigate } from 'react-router-dom';

const ListModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [subjectDetails, setSubjectDetails] = useState([]);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.className === styles.modalOverlay) {
        onClose();
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      const savedIds = JSON.parse(localStorage.getItem('savedIds')) || [];
      const details = await Promise.all(
        savedIds.map(async (id) => {
          const detail = await getSubjectDetail(id);
          console.log(detail);
          return detail;
        })
      );
      setSubjectDetails(details);
    };

    fetchSubjectDetails();
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {subjectDetails.length > 0
          ? subjectDetails.map((detail) => (
              <div key={detail.id} className={styles.detailItem}>
                <img src={detail.imageSource} alt='프로필' />
                <h3>{detail.name}</h3>
                <p>Questions: {detail.questionCount}</p>
              </div>
            ))
          : ''}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default ListModal;
