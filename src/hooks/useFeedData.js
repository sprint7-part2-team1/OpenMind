import { useEffect, useState } from 'react';
import {
  getSubjectDetail,
  getSubjectQuestions,
} from '../api/subjects/subjectsApi';

const useFeedData = ({ feedId }) => {
  // 상단 유저 프로필 데이터 상태
  const [userDetail, setUserDetail] = useState([]);

  const fetchSubjectDetailData = async () => {
    const { results } = await getSubjectDetail(feedId);
    setUserDetail(results);
  };

  useEffect(() => {
    fetchSubjectDetailData();
  }, []);

  return userDetail;
};

// 질문 카드 내용 데이터 가져오깅

export const useFeedQuestion = async ({ feedId, limit = 4, offset = 0 }) => {
  const [feedQuestions, setFeedQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { results } = await getSubjectQuestions(feedId, limit, offset);
      setFeedQuestions(results);
    };

    fetchQuestions();
  }, [feedId, limit, offset]);

  return feedQuestions;
};

export default { useFeedData, useFeedQuestion };
