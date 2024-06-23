import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import IndividualFeed from './pages/IndividualFeed/IndividualFeed';
import List from './pages/ListPages/List';
import AnswerFeed from './pages/AnswerFeed/AnswerFeed';

// CustomAudioPlayer 컴포넌트 정의
const CustomAudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio ref={audioRef} src={src} />
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/post/:subjectId' element={<IndividualFeed />} />
        <Route path='/post/:subjectId/answer' element={<AnswerFeed />} />
        <Route path='/list' element={<List />} />
      </Routes>
      <CustomAudioPlayer src='/music/starTeaParty.mp3' />
    </Router>
  );
}

export default App;
