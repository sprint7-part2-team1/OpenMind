const baseURL = import.meta.env.VITE_API_BASE_URL;

export const fetchApi = (url, options) => {
  return fetch(`${baseURL}/${url}`, {
    ...options,
  });
};
