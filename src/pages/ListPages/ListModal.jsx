import { useEffect, useState } from 'react';
import styles from './ListModal.module.css';
import {
  getSubjectDetail,
  deleteSubjects,
} from '../../api/subjects/subjectsApi';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

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
          try {
            const detail = await getSubjectDetail(id);
            return detail;
          } catch (error) {
            console.error(`Error fetching subject detail for ID ${id}:`, error);
            return null; // Handle error gracefully, return null or handle differently
          }
        })
      );
      // Filter out null values (error handling) and set subjectDetails
      setSubjectDetails(details.filter((detail) => detail !== null));
    };

    fetchSubjectDetails();
  }, []);

  const handleItemClick = (id) => {
    navigate(`/individualFeed/${id}/answer`);
  };

  const deleteUserId = (id) => {
    swal(
      'WARNING',
      '정말 아이디를 삭제할까요? 한번 삭제된 아이디는 다시 복구 할 수 없습니다.',
      'warning',
      {
        buttons: {
          삭제해주세요: true,
          cancel: '좀 더 고민할래요',
        },
      }
    ).then((value) => {
      switch (value) {
        case '삭제해주세요':
          try {
            deleteSubjects(id);
            const savedIds = JSON.parse(localStorage.getItem('savedIds')) || [];
            const updatedIds = savedIds.filter((savedId) => savedId !== id);
            localStorage.setItem('savedIds', JSON.stringify(updatedIds));
            swal('아이디가 삭제되었습니다.', '', 'success').then(() => {
              onClose();
              window.location.reload();
            });
          } catch (error) {
            console.error('아이디 삭제 중 오류 발생:', error);
            swal('아이디 삭제 중 오류가 발생했습니다.').then(() => {
              onClose();
            });
          }
          break;
        default:
          break;
      }
    });
  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.close} onClick={onClose}>
          닫기
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
                  <p>받은 질문 : {detail.questionCount}</p>
                </div>
                <button
                  className={styles.delete}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteUserId(detail.id);
                  }}
                >
                  삭제
                </button>
              </div>
            ))
          : ''}
      </div>
    </div>
  );
};

export default ListModal;
