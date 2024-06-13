import React, { useEffect, useState } from 'react';
import { getUserData } from './api/subjects/getUserData'; // 정확한 경로로 수정하세요

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData('6715');
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Fetching data...</div>;
  }

  if (error) {
    return <div>오류 발생: {error.message}</div>;
  }

  return (
    <div>
      <h1>User Data</h1>
      {userData && (
        <div>
          <p>ID: {userData.id}</p>
          <p>Name: {userData.name}</p>
          <img src={userData.imageSource} alt='User' />
          <p>Question Count: {userData.questionCount}</p>
          <p>Created At: {new Date(userData.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
