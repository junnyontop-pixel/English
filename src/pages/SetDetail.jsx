import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SetDetail.css';

const SetDetail = ({ currentSet }) => {
  const navigate = useNavigate();

  if (!currentSet) return <div className="app-container">선택된 세트가 없습니다.</div>;

  // const wordList = Array.isArray(currentSet.data) 
  //   ? currentSet.data 
  //   : (Array.isArray(currentSet) ? currentSet : []);

  const wordList = currentSet.data || [];

  return (
    <div className="page-layout">
      <div className="set-header">
        <h1>📂 {wordList.title || "학습 세트"}</h1>
        <p>총 {wordList.length}개의 카드가 준비되었습니다.</p>
      </div>

      {/* 학습 모드 선택 섹션 */}
      <div className="mode-selection-grid">
        <button className="mode-btn" onClick={() => navigate('/voca')}>📖 단어장</button>
        <button className="mode-btn" onClick={() => navigate('/reading')}>📒 스크램블</button>
        <button className="mode-btn" onClick={() => navigate('/speaking')}>🙌 스피킹</button>
      </div>

      <hr />

      {/* 단어 목록 미리보기 (클래스카드 스타일) */}
      <div className="word-preview-list">
        <h3>미리보기</h3>
        {wordList.map((item, idx) => (
          <div key={idx} className="word-preview-item">
            <span className="eng">{item.eng}</span>
            <span className="kor">{item.kor}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetDetail;