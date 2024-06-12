const fetchInstance = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData;
};

const baseURL = import.meta.env.VITE_API_BASE_URL;
const timeout = 2000;

const fetchWrapper = async (path, options = {}) => {
  const url = new URL(path, baseURL);

  const { timeout: timeoutOption = timeout, ...otherOptions } = options;

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request Timeout over 2 seconds.'));
    }, timeoutOption);
  });

  const responsePromise = fetchInstance(url.toString(), otherOptions);

  try {
    const responseData = await Promise.race([timeoutPromise, responsePromise]);
    return responseData;
  } catch (error) {
    throw error;
  }
};

export default fetchWrapper;
