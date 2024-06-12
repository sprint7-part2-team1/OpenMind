function ShareLink() {
  const url = window.location.href;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
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
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  };

  return (
    <div>
      <button onClick={copyToClipboard}>link공유하기</button>
      <button onClick={shareKakaoTalk}>카카오톡으로 공유하기</button>
      <button onClick={shareFacebook}>페이스북으로 공유하기</button>
    </div>
  );
}

export default ShareLink;
