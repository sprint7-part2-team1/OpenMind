export const getUserData = async (userId) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  try {
    const response = await fetch(`${baseURL}/subjects/${userId}/`);

    if (!response.ok) {
      throw new Error('사용자 정보를 불러오지 못했습니다.');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET 7-1/subjects/{sub_id}/    ===> getUserData.js

// 상단에 아초는 고양이 프사 띄우는 api ==> GET 7-1/subjects/{sub_id}/
