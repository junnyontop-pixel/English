import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SetDetail.css';

const SetDetail = ({ currentSet }) => {
  const navigate = useNavigate();

  if (!currentSet) {
    return (
      <div className="page-layout">
        <p>선택된 세트 정보가 없습니다. 다시 선택해주세요!</p>
        <button onClick={() => navigate('/set-selector')}>목록으로 가기</button>
      </div>
    );
  }

  const wordList = Array.isArray(currentSet.data) 
    ? currentSet.data 
    : (Array.isArray(currentSet) ? currentSet : []);

  return (
    <div className="page-layout">
      <div className="set-header">
        <h1>📂 {currentSet.title || "학습 세트"}</h1>
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
            {/* eng가 있으면 쓰고, 없으면 word를 써라! */}
            <span className="eng">{item.eng || item.word}</span>
            {/* kor이 있으면 쓰고, 없으면 meaning을 써라! */}
            <span className="kor">{item.kor || item.meaning}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetDetail;