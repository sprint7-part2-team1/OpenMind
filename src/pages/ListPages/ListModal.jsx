import { useEffect, useState } from 'react';
import styles from './ListModal.module.css';
import { getSubjectDetail } from '../../api/subjects/subjectsApi';
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

  const deleteUserId = () => {
    swal(
      ' 경고',
      '정말 아이디를 삭제할까요? 한번 삭제된 아이디는 다시 복구 할 수 없습니다.',
      {
        buttons: {
          삭제해주세요: true,
          cancel: '좀 더 고민할래요',
        },
      }
    ).then((value) => {
      switch (value) {
        case '삭제해주세요':
          swal('아이디가 삭제되었습니다.').then(() => {
            onClose();
          });
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
                    deleteUserId();
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
