export const createQuestion = async (formData, id) => {
  try {
    const response = await fetch(`https://openmind-api.vercel.app/7-1/subjects/6716/questions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
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
