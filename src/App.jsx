import { useEffect } from 'react';
import {
  deleteSubjects,
  getSubjectDetail,
  getSubjects,
} from './api/subjects/subjectsApi';

import {
  getAnswer,
  deleteAnswer,
  putAnswer,
  patchAnswer,
} from './api/answers/answersApi';

function App() {
  useEffect(() => {
    const foo = async () => {
      // const data = await deleteSubjects(6716); 검증완 !
      // const data = await getAnswer(5514); 검증완 !!
      // const data = await putAnswer(       검증완 !!
      //   5514,
      //   '나 api로 수정했어요 ~ 거절 안한 상태 ~~',
      //   false
      // );
      const data = await patchAnswer(
        5514,
        '나 patch로 수정햇어요 이번엔 거절 ~',
        true
      );

      console.log(data);
    };

    foo();
  }, []);

  return <></>;
}
export default App;
