import { useState, useEffect } from 'react';
import { fetchApi } from '../api/instance/fetchInstance';
import { getSubjectDetail } from '../api/subjects/subjectsApi';

const useFeedCardInfinityScroll = (subjectId) => {
  const [questions, setQuestions] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [offset, setOffset] = useState(0);
  

  const [isMounted, setIsMounted] = useState(false);
  const limit = 4;

  useEffect(() => {
    if (isMounted) {
      loadQuestions();
    }

    setIsMounted(true);
  }, [subjectId, offset, isMounted]);

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

      const subjectDetail = await getSubjectDetail(subjectId);
        setUserInfo(subjectDetail);

      if (Array.isArray(data.results)) {
        setQuestions((prevQuestions) => [...prevQuestions, ...data.results]);
        setQuestionCount(data.count);
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