import '../global.css';
import { loginPageBackgroundImage, Logo, personIcon } from '../assets/images';
import Icon from '../components/Icon/Icon';
import style from './LoginPage.module.css';
// import { Link } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

function LoginPage() {
  const InputWithLocalStorage = () => {
    const [inputValue, setInputValue] = useState(() => {
      // 컴포넌트 마운트 시 로컬 스토리지에서 초기값 가져오기
      return localStorage.getItem('inputValue') || '';
    });
  };

  return (
    <div className={style.header}>
      <div className={style.header_box}>
        {/* <Link to='/questionListPage' className={style.header_right}>
          <a>질문하러 가기</a>
        </Link> */}
        <button className={style.header_right}>질문하러 가기</button>
      </div>
      <div className={style.main}>
        <img className={style.main_logo} src={Logo} alt='Logo' />

        <form className={style.form}>
          <input
            className={style.nickName_input}
            placeholder='이름을 입력하세요'
          ></input>
          <span className={style.input_personIcon}>
            <img src={personIcon} alt='personIcon' />
            {/* <Icon iconName={'Person'} /> */}
          </span>
          <button className={style.login_btn}>질문 받기</button>
        </form>
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
