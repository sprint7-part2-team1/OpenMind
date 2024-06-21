import { useState, useEffect } from 'react';
import ListCardItem from './ListCardItem';
import Pagination from 'react-js-pagination';
import './PagiNation.css';
import styles from './List.module.css';
import { getSubjects } from '../../api/subjects/subjectsApi';

const ListCard = ({ searchValue, onlyForMount, sortOrder }) => {
  const [subjectList, setSubjectList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(8); // 초기 세팅값 페이지당 8개
  const itemsPerPage = itemsCount;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSubjects(9999);
        const { results } = await response;
        setSubjectList(results);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
      }
    };
    fetchData();
  }, [onlyForMount]);

  //  정렬기준 변경시, 현재페이지 1로이동
  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder, searchValue]);

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let filteredItems = [];

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

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
        activePage={currentPage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={filteredItems.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        prevPageText='<'
        nextPageText='>'
        itemClass='page-item'
        linkClass='page-link'
      />
    </div>
  );
};

export default ListCard;
