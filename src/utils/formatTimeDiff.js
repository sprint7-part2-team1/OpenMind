const formatTimeDiff = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;

  if (isNaN(date)) {
    return 'Invalid Date';
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (seconds < 60) {
    return `방금 전`;
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else if (days < 7) {
    return `${days}일 전`;
  } else if (weeks < 5) {
    return `${weeks}주 전`;
  } else {
    return date.toLocaleDateString();
  }
};

export default formatTimeDiff;
