import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Voca from './pages/Voca'; // './Voca'에서 './pages/Voca'로 변경!
import Speaking from './pages/Speaking';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="main-nav">
          {/* 3. Voca 대신 Link를 써야 페이지 이동이 돼! */}
          <Link to="/">홈</Link>
          <Link to="/voca">단어장으로 이동</Link>
          <span className="disabled">독해(준비중)</span>
          <Link to="/speaking">스피킹으로 이동</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <header className="home-header">
              <h1>⚡ 가성비 영어 학습 서비스</h1>
              <p>원하는 학습 모드를 선택해봐, 유준아!</p>
              {/* 홈 화면에서도 바로 갈 수 있게 버튼 하나 만들어둘까? */}
              <Link to="/voca"><button>단어 공부 시작하기</button></Link>
            </header>
          } />
          <Route path="/voca" element={<Voca />} />
          <Route path="/speaking" element={<Speaking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;