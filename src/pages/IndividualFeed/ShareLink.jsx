function ShareLink() {
  const copyToClipboard = () => {
    const url = window.location.href;

    navigator.clipboard.writeText(url);
  };

  return (
    <div>
      <button onClick={copyToClipboard}>link공유하기</button>
      <button></button>
      <button></button>
    </div>
  );
}

export default ShareLink;
