import { useState } from 'react';
import ListCard from './ListCard';
import styles from './List.module.css';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

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
        <Link to='/' className={styles.header_right}>
          <img
            className={styles.logo}
            src='src\assets\images\logo.png'
            alt='List-logo'
          />
        </Link>
        <Button text={'GoAs'} />
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
          <select onChange={handleSelectChange}>
            <option value='newest'>최신순</option>
            <option value='questions'>질문순</option>
          </select>
        </div>
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
