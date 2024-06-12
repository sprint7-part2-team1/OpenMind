export const postNewFeed = async (userName) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  try {
    const response = await fetch(`${baseURL}${userName}/`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('사용자 피드 생성 오류');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return { message: error.message };
  }
};
