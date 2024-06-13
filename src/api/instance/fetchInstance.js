const baseURL = import.meta.env.VITE_API_BASE_URL;

console.log(baseURL);

export const fetchApi = (url, options) => {
  return fetch(`${baseURL}/${url}`, {
    ...options,
  });
};
