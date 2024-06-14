import { useState } from 'react';
import ListCard from './ListCard';

const List = () => {
  const [searchValue, setSearchValue] = useState('');
  const [onlyForMount, setOnlyForMount] = useState(0);
  const [sortOrder, setSortOrder] = useState('newest');
  // 기본값은 최신순

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSearchValue('');
    setSortOrder(e.target.value);
    setOnlyForMount((prevOnlyForMount) => prevOnlyForMount + 1);
    // 리마운트 용
  };

  return (
    <div>
      <header>
        <img src="src/assets/images/List-logo.png" alt="List-logo" />
        <button>버튼</button>
      </header>
      <h1>누구에게 질문할까요?</h1>
      <div>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={searchValue}
          onChange={handleInputChange}
        />
        <select onChange={handleSelectChange}>
          <option value="newest">최신순</option>
          <option value="questions">질문순</option>
        </select>
      </div>
      <ListCard
        searchValue={searchValue}
        onlyForMount={onlyForMount}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default List;
