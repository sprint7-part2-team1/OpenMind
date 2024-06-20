import { useState } from 'react';
import ListCard from './ListCard';
import styles from './List.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button/Button';
import swal from 'sweetalert';
import ListModal from './ListModal';

const List = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL 쿼리 파라미터에서 초기 상태 가져오기
  const queryParams = new URLSearchParams(location.search);
  const initialSearchValue = queryParams.get('search') || '';
  const initialSortOrder = queryParams.get('sort') || 'newest';
  const initialPage = queryParams.get('page') || 1;

  // 검색어, 정렬 옵션, 리마운트, 모달 상태
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [onlyForMount, setOnlyForMount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 검색어 변경 시 URL 업데이트
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    updateURL(newValue, sortOrder, 1);
  };

  // 정렬 옵션 변경 시 URL 업데이트 및 리마운트
  const handleSelectChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    updateURL(searchValue, newSortOrder, 1);
    setOnlyForMount((prevOnlyForMount) => prevOnlyForMount + 1);
  };

  // URL 쿼리 파라미터 업데이트 함수
  const updateURL = (search, sort, page) => {
    navigate(`?search=${search}&sort=${sort}&page=${page}`);
  };

  // GoAs 버튼 클릭 시 동작
  const handleGoAsClick = () => {
    const savedIds = localStorage.getItem('savedIds');
    if (!savedIds) {
      swal('아이디를 생성하지 않았군요! 생성하러 갈까요?', '', 'info', {
        buttons: {
          '네,갈래요': true,
          cancel: '구경만 할게요',
        },
      }).then((value) => {
        switch (value) {
          case '네,갈래요':
            navigate('/');
            break;
          default:
            break;
        }
      });
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <header>
        <Link to='/' className={styles.header_right}>
          <img
            className={styles.logo}
            src='src/assets/images/logo.png'
            alt='List-logo'
          />
        </Link>
        <Button text={'GoAs'} onClick={handleGoAsClick} />
      </header>
      <h1>누구에게 질문할까요?</h1>
      <div className={styles.ListNav}>
        <div className={styles.ListNavInnerConatiner}>
          <input
            type='text'
            placeholder='아이디를 검색하세요!'
            value={searchValue}
            onChange={handleInputChange}
          />
          <select value={sortOrder} onChange={handleSelectChange}>
            <option value='newest'>최신순</option>
            <option value='questions'>질문순</option>
          </select>
        </div>
      </div>

      <ListCard
        searchValue={searchValue}
        onlyForMount={onlyForMount}
        sortOrder={sortOrder}
        currentPage={Number(initialPage)} // currentPage를 ListCard로 전달
      />
      {isModalOpen && <ListModal onClose={closeModal} />}
    </div>
  );
};

export default List;
