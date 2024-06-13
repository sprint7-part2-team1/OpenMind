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
    const response = await fetchApi(`subjects?${queryString}`, {
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

export const getSubjectQuestions = async (id, limit, offset) => {
  try {
    const response = await fetchApi(`subjects/${id}`, { method: 'GET' });

    if (!response.ok) {
      throw new Error('fetch failed');
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const postSubjects = async (newSubjects) => {
  try {
    const response = await fetchApi('subjects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSubjects),
    });

    if (!response.ok) {
      throw new Error('fetch failed');
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
