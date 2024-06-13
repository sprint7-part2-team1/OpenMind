import { fetchApi } from '../instance/fetchInstance';

// question api 모음

export const getQuestionDetail = async (id) => {
  try {
    const response = await fetchApi(`questions/${id}/`, { method: 'GET' });

    if (!response.ok) {
      throw new Error('fetch failed');
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteQuestionDetail = async (id) => {
  try {
    const response = await fetchApi(`questions/${id}/`, { method: 'DELETE' });

    if (!response.ok) {
      throw new Error('fetch failed');
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const postReaction = async (id, type) => {
  try {
    const response = await fetchApi(`questions/${id}/reaction/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type }),
    });

    if (!response.ok) {
      throw new Error('fetch failed');
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const postNewAnswer = async (questionId, content, isRejected) => {
  const updateData = {
    questionId,
    content,
    isRejected,
  };

  try {
    const response = await fetchApi(`questions/${questionId}/answers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error('fetch failed');
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
