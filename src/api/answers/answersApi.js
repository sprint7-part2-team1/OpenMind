import { fetchApi } from '../instance/fetchInstance';

export const getAnswer = async (id) => {
  try {
    const response = await fetchApi(`answers/${id}/`, { method: 'GET' });

    if (!response.ok) {
      throw new Error('fetch failed');
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteAnswer = async (id) => {
  try {
    const response = await fetchApi(`answers/${id}/`, { method: 'DELETE' });

    if (!response.ok) {
      throw new Error('fetch failed');
    }

    return response
  } catch (error) {
    console.error(error);
  }
};

export const putAnswer = async (id, content, isRejected) => {
  const updateData = {
    content,
    isRejected,
  };

  try {
    const response = await fetchApi(`answers/${id}/`, {
      method: 'PUT',
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

export const patchAnswer = async (id, content, isRejected) => {
  const updateData = {
    content,
    isRejected,
  };

  try {
    const response = await fetchApi(`answers/${id}/`, {
      method: 'PUT',
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
