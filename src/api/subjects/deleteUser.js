export const deleteUser = async (userId) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  try {
    const response = await fetch(`${baseURL}/${userId}/`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('상품을 삭제하는데 실패했습니다.');
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
