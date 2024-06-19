import '../global.css';
import { Logo, personIcon } from '../assets/images';
import Button from '../components/Button/Button';
import styles from './LoginPage.module.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postSubject } from '../api/subjects/subjectsApi';

function LoginPage() {
  const [nameInput, setNameInput] = useState('');
  const [error, setError] = useState(null);
  const [result, setResult] = useState({});
  const navigate = useNavigate();

  const checkDuplicateNickname = (nickname) => {
    const nicknames = JSON.parse(localStorage.getItem('nicknames')) || [];
    return nicknames.includes(nickname);
  };

  const addNickname = (nickname) => {
    const nicknames = JSON.parse(localStorage.getItem('nicknames')) || [];
    nicknames.push(nickname);
    localStorage.setItem('nicknames', JSON.stringify(nicknames));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameInput.trim() !== '') {
      try {
        const SubjectResult = await postSubject(nameInput);
        setResult(SubjectResult);
        console.log(SubjectResult);

        // 로컬 스토리지에서 기존 데이터 가져오기
        let storedIds = localStorage.getItem('savedIds');
        let savedIds = [];
        if (storedIds) {
          savedIds = JSON.parse(storedIds);
        }
        // 새로운 id 추가
        savedIds.push(SubjectResult.id);
        // 배열을 다시 로컬 스토리지에 저장
        localStorage.setItem('savedIds', JSON.stringify(savedIds));
        navigate(`/individualFeed/${SubjectResult.id}`);
      } catch (error) {
        console.error('회원생성에 실패했습니다:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_box}>
          <Link to='/list'>
            <Button text='GoQs' />
          </Link>
        </div>
      </div>

      <div className={styles.main}>
        <img className={styles.main_logo} src={Logo} alt='Logo' />

        <div className={styles.form}>
          <input
            className={styles.nickName_input}
            value={nameInput}
            placeholder='이름을 입력하세요'
            onChange={(e) => {
              setNameInput(e.target.value);
              setError(null);
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <span className={styles.input_personIcon}>
            <img src={personIcon} alt='personIcon' />
          </span>
          <Button text='TakeQs' onClick={(e) => handleSubmit(e)} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
