import { useState } from 'react';
import ListCard from './ListCard';
import styles from './List.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button/Button';
import swal from 'sweetalert';
import ListModal from './ListModal';
import '../../assets/css/swal.css';
import ListLogo from '../../assets/images/logo.png';

const List = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialSearchValue = queryParams.get('search') || '';
  const initialSortOrder = queryParams.get('sort') || 'newest';
  const initialPage = queryParams.get('page') || 1;

  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [onlyForMount, setOnlyForMount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    updateURL(newValue, sortOrder, 1);
  };

  const handleSelectChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    updateURL(searchValue, newSortOrder, 1);
    setOnlyForMount((prevOnlyForMount) => prevOnlyForMount + 1);
  };

  const updateURL = (search, sort, page) => {
    navigate(`?search=${search}&sort=${sort}&page=${page}`);
  };

  const handleGoAsClick = () => {
    if (
      !localStorage.getItem('savedIds') ||
      JSON.parse(localStorage.getItem('savedIds')).length === 0
    ) {
      swal(
        '아이디를 생성하러 갈까요?',
        '아직 아이디를 생성하지 않으셨네요! \n 아이디를 생성하시면 질문을 받을 수 있습니다',
        'info',
        {
          buttons: {
            갈래요: true,
            cancel: '구경만 할게요',
          },
        }
      ).then((value) => {
        switch (value) {
          case '갈래요':
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

  const handlereload = () => {
    navigate('/list');
    setSearchValue('');
  };

  return (
    <div className={styles.body}>
      <div className={styles.background}></div>
      <header>
        <Link to='/' className={styles.header_right}>
          <img className={styles.logo} src={ListLogo} alt='List-logo' />
        </Link>
        <Button text={'GoAs'} onClick={handleGoAsClick} />
      </header>
      <h1>누구에게 질문할까요?</h1>
      <div className={styles.ListNav}>
        <div className={styles.ListNavInnerConatiner}>
          <div className={styles.InputWrapper}>
            <input
              type='text'
              placeholder='아이디를 검색하세요!'
              value={searchValue}
              onChange={handleInputChange}
            />
            <button onClick={handlereload}>↻</button>
          </div>
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
        currentPage={Number(initialPage)}
      />
      {isModalOpen && <ListModal onClose={closeModal} />}
    </div>
  );
};

export default List;
