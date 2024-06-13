export const postNewQuestion = async (content, id) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  try {
    const response = await fetch(`${baseURL}/subjects/${id}/questions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (response.status !== 201) {
      throw new Error('질문 하기 실패 !');
    }

    return response.json();
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
};
