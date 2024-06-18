import '../global.css';
import { Logo, personIcon } from '../assets/images';
import Icon from '../components/Icon/Icon';
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
      if (checkDuplicateNickname(nameInput)) {
        setError('닉네임이 이미 존재합니다.');
      } else {
        try {
          const SubjectResult = await postSubject(nameInput);
          addNickname(nameInput);
          setResult(SubjectResult);
          console.log(SubjectResult);
          navigate(`/individualFeed/${SubjectResult.id}`);
        } catch (error) {
          console.error('회원생성에 실패했습니다:', error);
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_box}>
          <Link to='/list' className={styles.header_right}>
            질문하러 가기
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
          <button className={styles.login_btn} onClick={(e) => handleSubmit(e)}>
            질문 받기
          </button>
        </div>
      </div>
      <div className={styles.empty_box}></div>
      <footer className={styles.footer}></footer>
    </div>
  );
}

export default LoginPage;
