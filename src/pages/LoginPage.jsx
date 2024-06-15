import logo from '../assets/images/logo.png';
import Icon from '../components/Icon/Icon'
import style from './LoginPage.module.css';
import '../global.css';

function LoginPage() {
  return(
    <div className={style.bg}>
      <div className={style.content}>
        <a href='#'>질문하러 가기</a>
        <img src={logo} alt='logo' />
        <form>
          <Icon iconName={'Person'}/>
          <input placeholder='이름을 입력하세요'></input>
          <button>질문 받기</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;