import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './global.css';

function KakaoInit() {
  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init('fc67d626b1c3f9e2bc05016a2ccab46d');
      }
    }
  }, []);

  return null;
}

function KakaoInit() {
  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init('fc67d626b1c3f9e2bc05016a2ccab46d');
      }
    }
  }, []);

  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <KakaoInit />
    <App />
  </React.StrictMode>
);
