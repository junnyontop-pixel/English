import React from 'react';
import { useNavigate } from 'react-router-dom';

const SetSelector = ({ sets, onSelectSet }) => {
  const navigate = useNavigate();

  return (
    <div className="set-selector">
      <h2>📚 학습 세트를 선택해봐!</h2>
      <div className="menu-grid">
        {sets.map((set) => (
          <button 
            key={set.id} 
            className="menu-card"
            onClick={() => {
              onSelectSet(set); // 선택한 세트 데이터를 상태로 전달
              navigate('/set-detail');     // 바로 세트 상세보기로 이동
            }}
          >
            <span className="menu-icon">📁</span>
            <span>{set.title}</span>
            <small style={{fontSize: '0.7rem', color: '#888'}}>{set.data.length} 단어</small>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SetSelector;