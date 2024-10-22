import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getSubjectQuestions,
  createQuestion,
} from '../../api/subjects/subjectsApi';

//질문내용을 가져오는 함수
export const getQuestions = (subjectId) => {
  return getSubjectQuestions(subjectId);
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ subjectId, content }) =>
      createQuestion({ subjectId, content }, subjectId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['questions', variables.subjectId],
      });
    },
  });
};
