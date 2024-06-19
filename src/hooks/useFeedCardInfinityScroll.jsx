import { useState, useEffect } from 'react';
import { fetchApi } from '../api/instance/fetchInstance';

const useFeedCardInfinityScroll = (subjectId) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 4;

  useEffect(() => {
    loadQuestions();
  }, [subjectId, offset]);

  const loadQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetchApi(
        `subjects/${subjectId}/questions/?limit=${limit}&offset=${offset}`,
        {
          method: 'GET',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();

      const count = data.count;
      // 확인을 위해 응답 데이터를 콘솔에 출력
      console.log('Fetched data:', data);

      if (Array.isArray(data.results)) {
        setQuestions((prevQuestions) => [...prevQuestions, ...data.results]);
      } else {
        throw new Error('API response does not contain results array');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreQuestions = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return {
    questions,
    isLoading,
    error,
    loadMoreQuestions,
    setQuestions,
  };
};

export default useFeedCardInfinityScroll;
