import { useState, useEffect } from 'react';
import { getSubjects } from '../../api/subjects/subjectsApi';
import { useNavigate, useLocation } from 'react-router-dom';
import ListCardItem from './ListCardItem';
import Pagination from 'react-js-pagination';
import './PagiNation.css';
import styles from './List.module.css';
import Loading from '../../components/Loading/Loading';

const ListCard = ({ searchValue, onlyForMount, sortOrder, currentPage }) => {
  const [subjectList, setSubjectList] = useState([]);
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  const [itemsCount, setItemsCount] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = itemsCount;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getSubjects(9999);
        const { results } = await response;
        setSubjectList(results);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [onlyForMount]);

  useEffect(() => {
    setCurrentPageState(currentPage);
  }, [currentPage]);

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

  const updateURL = (pageNumber) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', pageNumber);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPageState(pageNumber);
    updateURL(pageNumber);
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
