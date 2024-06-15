import { useState, useEffect } from 'react';
import ListCardItem from './ListCardItem';
import Pagination from 'react-js-pagination';
import './PagiNation.css';
import styles from './List.module.css';

const ListCard = ({ searchValue, onlyForMount, sortOrder }) => {
  const [subjectList, setSubjectList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(8); // 초기 세팅값 페이지당 8개
  const itemsPerPage = itemsCount;

  useEffect(() => {
    // const response = await getSubjects(999, 0); -> 머지되면 수정할 코드.
    const fetchData = async () => {
      const response = await fetch(
        'https://openmind-api.vercel.app/7-1/subjects/?limit=9999'
      );
      const { results } = await response.json();
      setSubjectList(results);
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
