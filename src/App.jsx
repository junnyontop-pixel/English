import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Voca from './pages/voca';
import Speaking from './pages/Speaking';
import Reading from './pages/Reading';
import SetSelector from './pages/SetSelector';
import SetDetail from './pages/SetDetail';
import SetAdmin from './pages/SetAdmin';
import './App.css';

// supabase 불러오기
import { supabase } from './supabase';

function App() {
  const navigate = useNavigate();
  const [allSets, setAllSets] = useState([]);
  const [currentStudyData, setCurrentStudyData] = useState(null);
  
  // 🟢 1. 로그인 유저 상태 추가
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchSetsFromSupabase();
    
    // 🟢 2. 로그인 상태 감시 (세션이 바뀌면 자동으로 user 업데이트)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchSetsFromSupabase = async () => {
    const { data, error } = await supabase.from('study_sets').select('*');
    if (error) {
      console.error("데이터 못 가져옴 ㅠㅠ:", error);
    } else {
      setAllSets(data);
      if (data.length > 0) setCurrentStudyData(data[0].data);
    }
  };

  // 🐙 3. 깃허브 로그인 함수
  const loginWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.origin }
    });
  };

  // 👋 4. 로그아웃 함수
  const handleLogout = async () => {
    await supabase.auth.signOut();
    alert("로그아웃 되었어!");
  };

  return (
    <div className="app-container">
      {/* 🟢 5. 상단 네비바에 유저 정보 표시 */}
      <nav className="main-nav">
        <div className="nav-right">
          {user ? (
            <div className="user-profile">
              <img src={user.user_metadata.avatar_url} alt="profile" className="profile-img" />
              <span>{user.user_metadata.full_name}님</span>
              <div id="auth-button-container">
                <button className="auth-button" onClick={handleLogout}>로그아웃</button>
              </div>
              <button className="nav-button admin-link" onClick={() => navigate('/admin')}>⚙️ 세트 추가</button>
            </div>
          ) : (
            <button className="auth-button github-btn" onClick={loginWithGitHub}>🐙 깃허브 로그인</button>
          )}
        </div>

        <div className="nav-left">
          <button className="nav-button" onClick={() => navigate('/')}>🏠홈</button>
          <button className="nav-button" onClick={() => navigate('/voca')}>📖단어장</button>
          <button className="nav-button" onClick={() => navigate('/reading')}>📒스크램블</button>
          <button className="nav-button" onClick={() => navigate('/speaking')}>🙌스피킹</button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <header className="home-header">
            <h1>⚡ 가성비 영어 학습 서비스</h1>
            {user ? <p>{user.user_metadata.full_name}님, 공부할 준비 됐어?</p> : <p>로그인하고 데이터를 관리해봐!</p>}
            <div id="studyBtn_container">
              <button className="controls button" id='studyBtn' onClick={() => navigate("/voca")}>📖단어 공부</button>
              <button id='studyBtn' onClick={() => navigate("/reading")}>📒스크램블</button>
              <button id='studyBtn' onClick={() => navigate("/speaking")}>🙌스피킹</button>
              <button id='studyBtn' style={{background: '#6e5494', color: 'white'}} onClick={() => navigate("/set-selector")}>📂 세트 선택하기</button>
            </div>
          </header>
        } />
        
        <Route path="/voca" element={<Voca data={currentStudyData} />} />
        <Route path="/speaking" element={<Speaking data={currentStudyData} />} />
        <Route path="/reading" element={<Reading data={currentStudyData} />} />
        <Route path="/set-selector" element={<SetSelector sets={allSets} onSelectSet={setCurrentStudyData} />} />
        <Route path="/set-detail" element={<SetDetail currentSet={currentStudyData} />} />
        
        {/* 🟢 6. 로그인 안 한 사람은 어드민 접근 불가 (보안 가성비!) */}
        <Route path="/admin" element={user ? <SetAdmin /> : <div className="app-container">로그인이 필요해!</div>} />
      </Routes>
    </div>
  );
}

export default App;