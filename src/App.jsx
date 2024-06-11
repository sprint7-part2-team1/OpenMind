import FeedCard from './components/FeedCard';

function App() {
  const testData = {
    status: 'complete',
    question: '좋아하는 동물은?',
    createdAt: '2024-06-11T08:23:51',
    userProfileImage: 'https://via.placeholder.com/40', // Placeholder image URL
    username: '아초는고양이',
    answer:
      '그들을 불러 귀는 이상의 오직 피고, 가슴이 이상, 못할 봄바람이다. 찾아다녀도, 전인 방향하였으며, 대한 바이이며, 이것이야말로 가치를 청춘의 따뜻한 그리하였는가? 몸이 열락의 청춘의 때문이다. 천고에 피어나는 간에 밝은 이상, 인생의 만물은 피다. 대중을 이성은 방향하여도, 그리하였는가? 크고 평화스러운 품에 방향하였으며, 말이다. 이상은 들어 예수는 크고 진지라 역사를 피다. 엉큼에 있음으로써 꽃 보배를 곧 가는 교향악이다. 우는 새 예가 우리의 것은 피다. 피가 그것을 어디 앉이 기쁘며, 이상의 열락의 위하여서 끝까지 것이다. 있는 봄 바람을 방향하여도, 우리의 것은 작고 아닌지 영원히 듣기만 운다.',
  };

  return (
    <div className='App'>
      <FeedCard
        status={testData.status}
        question={testData.question}
        userProfileImage={testData.userProfileImage}
        username={testData.username}
        answer={testData.answer}
      />
    </div>
  );
}
export default App;
