import { fetchApi } from '../instance/fetchInstance';

// subjects api 모음

/**
 *
 * @param {*} id는 삭제할 Subjects의 id 값입니다.
 * @returns
 */
export const deleteSubjects = async (id) => {
  try {
    const response = await fetchApi(`subjects/${id}/`, { method: 'DELETE' });

    if (!response.ok) {
      throw new Error('fetch failed');
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getSubjects = async (limit, offset) => {
  const queryString = new URLSearchParams({
    limit,
    offset,
  }).toString();

  try {
    const response = await fetchApi(`subjects/?${queryString}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('fetch failed');
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getSubjectDetail = async (id) => {
  try {
    const response = await fetchApi(`subjects/${id}/`, { method: 'GET' });

    if (!response.ok) {
      throw new Error('fetch failed');
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getSubjectQuestions = async (id, limit = 999, offset = 0) => {
  const queryString = new URLSearchParams({
    limit,
    offset,
  }).toString();
  try {
    const response = await fetchApi(
      `subjects/${id}/questions/?${queryString}/`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error('fetch failed');
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const postSubject = async (name) => {
  try {
    const response = await fetchApi('subjects/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error('fetch failed');
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const postSubjectQuestion = async (subjectId, content) => {
  const updateData = {
    subjectId,
    content,
  };

  try {
    const response = await fetchApi(`subjects/${subjectId}/questions/`, {
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


export const createQuestion = async (formData, id) => {
  try {
    const response = await fetchApi(`subjects/${id}/questions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.status !== 201) {
      throw new Error('질문 보내기에 실패했습니다.');
    }

    return response.json();
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
};

export const getModalProfile = async (id) => {
  const response = await fetchApi(`subjects/${id}/`);
  const body = await response.JSON();
  return body;
};
