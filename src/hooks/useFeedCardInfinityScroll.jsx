import { useState, useEffect } from 'react';
import { fetchApi } from '../api/instance/fetchInstance';

const useFeedCardInfinityScroll = (subjectId) => {
  const [questions, setQuestions] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const limit = 4;

  useEffect(() => {
    loadQuestions();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [subjectId, offset]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading ||
      !hasMore
    ) {
      return;
    }
    loadMoreQuestions();
  };

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

      console.log('Fetched data:', data);

      if (Array.isArray(data.results)) {
        setQuestions((prevQuestions) => [...prevQuestions, ...data.results]);
        setQuestionCount(data.count);
        setUserInfo(data.userInfo); // Assuming userInfo is part of the response
        if (data.results.length < limit) {
          setHasMore(false);
        }
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
    questionCount,
    isLoading,
    error,
    userInfo,
    loadMoreQuestions,
    setQuestions,
  };
};

export default useFeedCardInfinityScroll;
