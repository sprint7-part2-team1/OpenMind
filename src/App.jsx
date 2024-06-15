import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './pages/modal/Modal.jsx';
import useModal from './pages/modal/useModal.jsx';

function App() {
  const { isOpen, openModal, closeModal} = useModal();
  const portalRoot = document.getElementById('portal-root');
  
  return (
    <div>
      <button onClick={openModal}>질문하러 가기</button>
      {isOpen && ReactDOM.createPortal(<Modal onClose={closeModal} />, portalRoot)}
    </div>
)
}
export default App;
