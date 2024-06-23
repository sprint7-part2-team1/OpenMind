import '../global.css';
import LogoImg from '../assets/images/logo.svg?react';
import Button from '../components/Button/Button';
import styles from './LoginPage.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSubjects, postSubject } from '../api/subjects/subjectsApi';

function LoginPage() {
  const [nameInput, setNameInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const uniqueNickCheck = async (name) => {
    try {
      const { results } = await getSubjects();
      const subjects = results;
      return (
        Array.isArray(subjects) &&
        !subjects.some((subject) => subject.name === name)
      );
    } catch (error) {
      throw new Error('닉네임 중복 확인에 실패했습니다.');
    }
  };

  const handleSubmit = async () => {
    if (nameInput.trim() === '') {
      setErrorMessage('이름을 입력하세요');
      return;
    }

    try {
      const isUnique = await uniqueNickCheck(nameInput);
      if (!isUnique) {
        setErrorMessage('이미 사용 중인 닉네임입니다.');
        return;
      }

      const SubjectResult = await postSubject(nameInput);
      const storedIds = JSON.parse(localStorage.getItem('savedIds')) || [];
      storedIds.push(SubjectResult.id);

      localStorage.setItem('savedIds', JSON.stringify(storedIds));
      navigate(`/post/${SubjectResult.id}/answer`);
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
    }
  };

  const handleOnClickSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit();
  };

  const handleKeyDownSubmit = async (e) => {
    if (!e.nativeEvent.isComposing && e.key === 'Enter') {
      e.preventDefault();
      await handleSubmit();
    }
  };

  return (
    <div className={styles.background}>
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
            onChange={(e) => {
              setNameInput(e.target.value);
              setErrorMessage(''); // 입력할 때 에러 메시지 초기화
            }}
            onKeyDown={handleKeyDownSubmit}
          />
          <Button text='TakeQs' onClick={handleOnClickSubmit} />
          {errorMessage && (
            <p className={styles.error_message}>{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
