import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import IndividualFeed from './pages/IndividualFeed/IndividualFeed';
import List from './pages/ListPages/List';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/individualFeed/:subjectId' element={<IndividualFeed />} />
        <Route path='/list' element={<List />} />
      </Routes>
    </Router>
  );
}

export default App;
