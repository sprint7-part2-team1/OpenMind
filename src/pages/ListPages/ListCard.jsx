import { useState, useEffect } from 'react';
import ListCardItem from './ListCardItem';
import Pagination from 'react-js-pagination';
import './PagiNation.css'

const ListCard = ({ searchValue, onlyForMount, sortOrder }) => {
  const [subjectList, setSubjectList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(8); // 반응형으로 사용될 state
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


//  정렬기준 변경시, 현재페이지 1로이동n
  useEffect(() => {
    setCurrentPage(1); 
  }, [sortOrder]);

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
      <div className="lala">
        {currentItems.map((item) => (
          <ListCardItem key={item.id} {...item} />
        ))}
      </div>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={filteredItems.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        prevPageText="<"
        nextPageText=">"
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
};

export default ListCard;