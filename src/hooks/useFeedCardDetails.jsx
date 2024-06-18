import { useState, useEffect } from 'react';
import {
  getSubjectDetail,
  getSubjectQuestions,
} from '../api/subjects/subjectsApi';

const useFeedCardDetails = (subjectId) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const questionData = await getSubjectQuestions(subjectId);
        setQuestions(questionData.results);

        const subjectDetail = await getSubjectDetail(subjectId);
        setUsername(subjectDetail.name);
        setUserProfileImage(subjectDetail.imageSource);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [subjectId]);

  return { questions, isLoading, error, userProfileImage, username };
};

export default useFeedCardDetails;
