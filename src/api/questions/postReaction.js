export const postReaction = async (questionId, type = 'like') => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  try {
    const response = await fetch(
      `https://openmind-api.vercel.app/7-1/questions/${questionId}/reaction/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      }
    );

    if (!response.ok) {
      throw new Error('리액션 보내는데 실패하였어요!');
    }

    return response;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
};
