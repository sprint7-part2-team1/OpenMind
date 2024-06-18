import '../global.css';
import { Logo, personIcon } from '../assets/images';
import Button from '../components/Button/Button';
import styles from './LoginPage.module.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postSubject } from '../api/subjects/subjectsApi';

function LoginPage() {
  const [nameInput, setNameInput] = useState('');
  const [result, setResult] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameInput.trim() !== '') {
      try {
        const SubjectResult = await postSubject(nameInput);
        setResult(SubjectResult);
        console.log(SubjectResult);
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
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
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
