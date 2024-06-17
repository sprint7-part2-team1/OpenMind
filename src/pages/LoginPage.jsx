import '../global.css';
import { loginPageBackgroundImage, Logo, personIcon } from '../assets/images';
import Icon from '../components/Icon/Icon';
import style from './LoginPage.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSubject } from '../api/subjects/subjectsApi';

function LoginPage() {
  const [nameInput, setNameInput] = useState('');
  const [result, setResult] = useState({});
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameInput.trim() !== '') {
      try {
        const SubjectResult = await postSubject(nameInput);
        setResult(SubjectResult);
        console.log(SubjectResult);
        // navigate(`/question/${SubjectResult.id}`);
      } catch (error) {
        console.error('회원생성에 실패했습니다:', error);
      }
    }
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.header_box}>
          {/* <Link to='/questionListPage' className={style.header_right}>
            <a>질문하러 가기</a>
          </Link> */}
          <button className={style.header_right}>질문하러 가기</button>
        </div>
      </div>
      <div className={style.main}>
        <img className={style.main_logo} src={Logo} alt='Logo' />

        <form className={style.form} onSubmit={handleSubmit}>
          <input
            className={style.nickName_input}
            value={nameInput}
            placeholder='이름을 입력하세요'
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
          <span className={style.input_personIcon}>
            <img src={personIcon} alt='personIcon' />
          </span>
          <button className={style.login_btn} type='submit'>
            질문 받기
          </button>
        </form>
      </div>
      <div className={style.empty_box}></div>
      <footer className={style.footer}>
        {/* <img
              className={style.footer_backgroundImg}
              src={loginPageBackgroundImage}
              alt='backgroundImage'
            /> */}
      </footer>
    </div>
  );
}

export default LoginPage;
