// queries/question.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createQuestion,
  getSubjectQuestions,
} from '../../api/subjects/subjectsApi';

/**
 * 질문 목록을 가져오는 함수
 * @param subjectId - 질문을 가져올 주제의 ID
 * @returns 질문 목록 데이터
 */
export const getQuestions = (subjectId) => {
  return getSubjectQuestions(subjectId);
};

/**
 * @useQuestionsQuery
 * 주어진 주제 ID로 서버에서 질문 목록을 가져오는 훅입니다.
 * @param subjectId - 주제 ID
 * @returns 질문 목록 데이터와 로딩/에러 상태
 */
export const useQuestionsQuery = (subjectId) => {
  return useQuery({
    queryKey: ['questions', subjectId],
    queryFn: () => getQuestions(subjectId),
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });
};

/**
 * @useCreateQuestionMutation
 * 새로운 질문을 생성하는 mutation 훅입니다.
 * 서버에 새 질문을 POST 요청으로 전송하고,
 * 성공 시 질문 목록을 무효화하여 다시 가져옵니다.
 */
export const useCreateQuestionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ subjectId, content }) =>
      createQuestion({ subjectId, content }, subjectId),
    onSuccess: (_, variables) => {
      // 해당 주제의 질문 목록을 무효화
      queryClient.invalidateQueries({
        queryKey: ['questions', variables.subjectId],
      });
    },
    onError: (error) => {
      console.error('질문 생성 실패:', error);
    },
  });
};
