import { useState } from 'react';
import Toast from './Toast';
import styles from './ShareLink.module.css';

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
        imageUrl: 'src/assets/images/team1.jpg',
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
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
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
