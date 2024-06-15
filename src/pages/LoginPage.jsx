import '../global.css';
import { loginPageBackgroundImage, Logo, personIcon } from '../assets/images';
import Icon from '../components/Icon/Icon';
import style from './LoginPage.module.css';
// import { Link } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

function LoginPage() {
  // const [nameInput, setNameInput] = useState('');
  // const [inputValue, setInputValue] = useState('');
  // const inputRef = useRef();

  // const handleNameInputKeyPress = (e) => {
  //   if (e.key === 'Enter' && nameInput.trim() !== '') {
  //     setNameInput();
  //   }
  // };

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
      <div className={style.make_gap}>
        <div className={style.main}>
          <img className={style.main_logo} src={Logo} alt='Logo' />

          <form className={style.form}>
            <input
              className={style.nickName_input}
              placeholder='이름을 입력하세요'
              onChange={(e) => setInputValue(e.target.value)}
            />
            <span className={style.input_personIcon}>
              <img src={personIcon} alt='personIcon' />
              {/* <Icon iconName={'Person'} /> */}
            </span>
            <button className={style.login_btn}>질문 받기</button>
          </form>
        </div>
      </div>
      <footer className={style.footer}>
        <img
          className={style.footer_backgroundImg}
          src={loginPageBackgroundImage}
          alt='backgroundImage'
        />
      </footer>
    </div>
  );
}
export default LoginPage;
