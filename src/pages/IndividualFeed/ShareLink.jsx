import { useState, useEffect } from 'react';
import Toast from './Toast';
import styles from './ShareLink.module.css';
import Icon from '../../components/Icon/Icon';

function ShareLink() {
  const url = window.location.href;
  const [toastMessage, setToastMessage] = useState('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setToastMessage('URL이 복사되었습니다.');
  };

  const closeToast = () => {
    setToastMessage('');
  };

  const shareKakaoTalk = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '오픈마인드',
        description: '궁금한 내용을 물어보세요!',
        imageUrl: 'https://via.placeholder.com/300', // 여기에 실제 이미지 URL을 넣으세요
        link: {
          webUrl: url,
          mobileWebUrl: url,
        },
      },
      buttons: [
        {
          title: '답변하러 가기',
          link: {
            webUrl: url,
            mobileWebUrl: url,
          },
        },
      ],
    });
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`); // 외부에서 접근 가능한 url이어야 기능 정상 작동.
  };

  return (
    <div>
      <div className={styles.shareBox}>
        <button className={styles.linkImg} onClick={copyToClipboard} />
        <button className={styles.kakaoImg} onClick={shareKakaoTalk} />
        <button className={styles.facebookImg} onClick={shareFacebook} />
      </div>

      {toastMessage && (
        <Toast message={toastMessage} duration={5000} onClose={closeToast} />
      )}
    </div>
  );
}

export default ShareLink;
