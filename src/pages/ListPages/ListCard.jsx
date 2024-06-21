import { useState, useEffect } from 'react';
import ListCardItem from './ListCardItem';
import Pagination from 'react-js-pagination';
import './PagiNation.css';
import styles from './List.module.css';
import { getSubjects } from '../../api/subjects/subjectsApi';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

const ListCard = ({ searchValue, onlyForMount, sortOrder, currentPage }) => {
  const [subjectList, setSubjectList] = useState([]); // 데이터 리스트 상태
  const [currentPageState, setCurrentPageState] = useState(currentPage); // 현재 페이지 상태
  const [itemsCount, setItemsCount] = useState(8); // 페이지당 아이템 수
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = itemsCount;
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const location = useLocation(); // 현재 URL 정보를 가져오기 위한 훅

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);  // 데이터 가져오기 시작 시 로딩 상태 true
      try {
        const response = await getSubjects(9999);
        const { results } = await response;
        setSubjectList(results);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
      } finally {
        setIsLoading(false);  // 데이터 가져오기 완료 시 로딩 상태 false
      }
    };
    fetchData();
  }, [onlyForMount]);

  

  // currentPage가 변경될 때 상태 업데이트
  useEffect(() => {
    setCurrentPageState(currentPage);
  }, [currentPage]);

  // 반응형 호출
  useEffect(() => {
    const updateItemsCount = () => {
      if (window.innerWidth <= 950) {
        setItemsCount(6);
      } else {
        setItemsCount(8);
      }
    };
    updateItemsCount();
    window.addEventListener('resize', updateItemsCount);
    return () => {
      window.removeEventListener('resize', updateItemsCount);
    };
  }, []);

  // URL 쿼리 파라미터 업데이트 함수
  const updateURL = (pageNumber) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', pageNumber);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  // 페이지 변경 시 호출
  const handlePageChange = (pageNumber) => {
    setCurrentPageState(pageNumber); // 현재 페이지 상태 업데이트
    updateURL(pageNumber); // URL 쿼리 파라미터 업데이트
  };

  let filteredItems = [];

  // 검색어와 정렬 옵션에 따라 리스트 필터링 및 정렬
  if (sortOrder === 'newest') {
    filteredItems = searchValue
      ? subjectList.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : subjectList;
  } else if (sortOrder === 'questions') {
    filteredItems = searchValue
      ? subjectList.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : subjectList;
    filteredItems.sort((a, b) => b.questionCount - a.questionCount);
  }

  // 현재 페이지에 해당하는 아이템들 계산
  const indexOfLastItem = currentPageState * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className={styles.outContainer}>
        <div className={styles.containerListCard}>
          {currentItems.map((item) => (
            <ListCardItem key={item.id} {...item} />
          ))}
        </div>
      </div>
      <Pagination
        activePage={currentPageState}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={filteredItems.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange} // 페이지 변경 핸들러
        prevPageText='<'
        nextPageText='>'
        itemClass='page-item'
        linkClass='page-link'
      />
    </div>
  );
};

export default ListCard;
