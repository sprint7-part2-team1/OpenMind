import { useEffect, useState } from "react";
import { getModalProfile } from "../../api/modalApi";

function ModalProfile({ team, subjectId }) {
  const [answers, setAnswers] = useState({
    id: null,
    name: "",
    imageSource: ""
  })

  const loadAnswers = async(subjectId, team) => {
    const { anwersProfile } = await getModalProfile(subjectId, team);
    setAnswers(anwersProfile);
  }

  useEffect(() => {
    loadAnswers(subjectId, team); 
    console.log(answers);
  },[])
  
  return (
    <></>
  );
}

export default ModalProfile;