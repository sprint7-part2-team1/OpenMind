import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import IndividualFeed from './pages/IndividualFeed/IndividualFeed';
import List from './pages/ListPages/List';
import AnswerFeed from './pages/AnswerFeed/AnswerFeed';
import ReactAudioPlayer from 'react-audio-player';

function App() {
  return (
    <Router>
      <ReactAudioPlayer
        src='/music/starTeaParty.mp3'
        autoPlay={true}
        controls
      />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/post/:subjectId' element={<IndividualFeed />} />
        <Route path='/post/:subjectId/answer' element={<AnswerFeed />} />
        <Route path='/list' element={<List />} />
      </Routes>
    </Router>
  );
}

export default App;
