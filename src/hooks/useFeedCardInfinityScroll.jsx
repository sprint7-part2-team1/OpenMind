import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getSubjectDetail } from '../api/subjects/subjectsApi';
import { fetchApi } from '../api/instance/fetchInstance';

const useFeedCardInfinityScroll = (subjectId) => {
  const limit = 4;

  // 사용자 정보를 가져오는 쿼리
  const { data: userInfo = {} } = useQuery({
    queryKey: ['subjectDetail', subjectId],
    queryFn: () => getSubjectDetail(subjectId),
  });

  // 질문 목록을 가져오는 무한 쿼리
  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: ['questions', subjectId],
      queryFn: async ({ pageParam = 0 }) => {
        const response = await fetchApi(
          `subjects/${subjectId}/questions/?limit=${limit}&offset=${pageParam}`,
          { method: 'GET' }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }

        return response.json();
      },
      getNextPageParam: (lastPage, allPages) => {
        // allPages 매개변수 추가
        // 다음 페이지가 있는지 확인
        const totalCount = lastPage.count;
        const loadedCount = allPages.length * limit; // 더 안정적인 계산 방식

        if (loadedCount < totalCount) {
          return loadedCount;
        }
        return undefined;
      },
      initialPageParam: 0, // 필수 추가
    });

  // 모든 페이지의 질문들을 하나의 배열로 합치기
  const questions = data?.pages.flatMap((page) => page.results) ?? [];
  const questionCount = data?.pages[0]?.count ?? 0;

  return {
    questions,
    questionCount,
    isLoading,

    error: error?.message,
    userInfo,
    loadMoreQuestions: fetchNextPage,
    hasNextPage, // hasNextPage 추가
    setQuestions: () => {},
  };
};

export default useFeedCardInfinityScroll;
