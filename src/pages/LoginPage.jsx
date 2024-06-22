import '../global.css';
import { personIcon } from '../assets/images';
import LogoImg from '../assets/images/logo.svg?react';
import Button from '../components/Button/Button';
import styles from './LoginPage.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postSubject } from '../api/subjects/subjectsApi';

function LoginPage() {
  const [nameInput, setNameInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (nameInput.trim() !== '') {
      try {
        const SubjectResult = await postSubject(nameInput);
        // 로컬 스토리지에서 기존 데이터 가져오기
        let storedIds = localStorage.getItem('savedIds');
        let savedIds = [];
        if (storedIds) {
          savedIds = JSON.parse(storedIds);
        }
        // 새로운 id 추가
        savedIds.push(SubjectResult.id);
        // Set을 배열로 변환하여 다시 로컬 스토리지에 저장
        localStorage.setItem('savedIds', JSON.stringify(Array.from(savedIds)));
        navigate(`/post/${SubjectResult.id}/answer`);
      } catch (error) {
        console.error('회원생성에 실패했습니다:', error);
      }
    }
  };

  const handleOnClickSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit();
  };

  const handleKeyDownSubmit = async (e) => {
    if (e.nativeEvent.isComposing === false && e.key === 'Enter') {
      e.preventDefault();
      await handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_button}>
          <Link to='/list'>
            <Button text='GoQs' />
          </Link>
        </div>
        <div className={styles.header_logo}>
          <LogoImg
            className={`${styles.logo_img} animate__animated animate__flipInX`}
            alt='Logo'
          />
        </div>
      </div>

      <div className={styles.input_box}>
        <input
          className={styles.nickName_input}
          value={nameInput}
          placeholder='이름을 입력하세요'
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => handleKeyDownSubmit(e)}
        />
        <Button text='TakeQs' onClick={(e) => handleOnClickSubmit(e)} />
      </div>
    </div>
  );
}

export default LoginPage;
