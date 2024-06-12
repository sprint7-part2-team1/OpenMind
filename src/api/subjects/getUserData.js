export const getUserData = async (userId) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  try {
    const response = await fetch(`${baseURL}${userId}/`);

    if (!response.ok) {
      throw new Error('사용자 정보를 불러오지 못했습니다.');
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
