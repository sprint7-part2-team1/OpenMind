export async function getSubjectsQuestion(id, limit = 2, offset = 0) {
  const baseURL = 'https://openmind-api.vercel.app/7-1';
  const queryString = new URLSearchParams({
    limit,
    offset,
  }).toString();

  try {
    const response = await fetch(
      `${baseURL}/subjects/${id}/questions/?${queryString}`
    );
    if (!response.ok) {
      throw new Error('질문 조회에 실패했습니다');
    }
    return await response.json();
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}

// GET 7-1/subjects/{sub_id}/questions/

// 3개의 질문이 있습니다 ==>  GET 7-1/subjects/{sub_id}/questions/ 에서 count 값
// 개별피드 질문 내용 리스트들 ===> GET 7-1/subjects/{sub_id}/questions/
// 2주전 ===> GET 7-1/subjects/{sub_id}/questions/   createdAt으로 계산
