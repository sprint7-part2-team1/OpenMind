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
          return detail;
        })
      );
      setSubjectDetails(details);
    };

    fetchSubjectDetails();
  }, []);

  const handleItemClick = (id) => {
    navigate(`/individualFeed/${id}/answer`);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.close} onClick={onClose}>
          X
        </button>
        {subjectDetails.length > 0
          ? subjectDetails.map((detail) => (
              <div
                key={detail.id}
                className={styles.detailItem}
                onClick={() => handleItemClick(detail.id)}
              >
                <img
                  className={styles.img}
                  src={detail.imageSource}
                  alt='프로필'
                />
                <div className={styles.content}>
                  <h3>{detail.name}</h3>
                  <p>받은 질문 수: {detail.questionCount}</p>
                </div>
              </div>
            ))
          : ''}
      </div>
    </div>
  );
};

export default ListModal;
