import '../global.css';
import { loginPageBackgroundImage, Logo, personIcon } from '../assets/images';
import Icon from '../components/Icon/Icon';
import style from './LoginPage.module.css';
// import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { postSubject } from '../api/subjects/subjectsApi';

// import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [nameInput, setNameInput] = useState('');
  const [result, setResult] = useState({});
  // const navigate = useNavigate();

  const handleNameInputKeyPress = async (e) => {
    if (e.key === 'Enter' && nameInput.trim() !== '') {
      e.preventDefault();
      try {
        const result = await postSubject(nameInput);
        setResult(result);
        console.log(result);
        // navigate(`/question/${result.id}`);
      } catch (error) {
        console.error('회원생성에 실패했습니다:', error);
      }
    }
  };

  const handleButtonClick = async () => {
    if (nameInput.trim() !== '') {
      try {
        const result = await postSubject(nameInput);
        setResult(result);
        console.log(result);
        // navigate(`/question/${result.id}`);
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

        <form className={style.form}>
          <input
            className={style.nickName_input}
            value={nameInput}
            placeholder='이름을 입력하세요'
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => handleNameInputKeyPress(e)}
          />
          <span className={style.input_personIcon}>
            <img src={personIcon} alt='personIcon' />
            {/* <Icon iconName={'Person'} /> */}
          </span>
          <button className={style.login_btn} onClick={handleButtonClick}>
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
