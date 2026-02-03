import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Voca from './pages/Voca';
import Speaking from './pages/Speaking';
import Reading from './pages/Reading';
import './App.css';

function App() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <nav className="main-nav">
        <button className="nav-button" onClick={() => navigate('/')}>🏠홈으로 가기</button>
        <button className="nav-button" onClick={() => navigate('/voca')}>📖단어장</button>
        <button className="nav-button" onClick={() => navigate('/reading')}>📒스크램블</button>
        <button className="nav-button" onClick={() => navigate('/speaking')}>🙌스피킹</button>
      </nav>

      <Routes>
        <Route path="/" element={
          <header className="home-header">
            <h1>⚡ 가성비 영어 학습 서비스</h1>
            <p>원하는 학습 모드를 선택해!</p
            <div id="studyBtn_container">
              <button className="controls button" id='studyBtn' onClick={() => navigate("/voca")}>📖단어 공부 시작하기📖</button>
              <button id='studyBtn' onClick={() => navigate("/reading")}>📒스크램블 시작하기📒</button>
              <button id='studyBtn' onClick={() => navigate("/speaking")}>🙌스피킹 시작하기🙌</button>
            </div>
          </header>
        } />
        <Route path="/voca" element={<Voca />} />
        <Route path="/speaking" element={<Speaking />} />
        <Route path="/reading" element={<Reading />} />
      </Routes>
    </div>
  );
}

export default App;