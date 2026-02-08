import React from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../supabase';

const SetSelector = ({ sets, setSets, onSelectSet, navigate }) => {

  const handleDeleteSet = async (setId, title) => {
    if (!window.confirm(`'${title}' 세트를 삭제할 거야?`)) return;

    const { error } = await supabase
      .from('study_sets')
      .delete()
      .eq('id', setId);

    if (error) {
      alert("삭제 실패 ㅠㅠ");
    } else {
      setSets(prev => prev.filter(s => s.id !== setId));
      alert("삭제 완료! 🧹");
    }
  };

  return (
    <div className="set-selector">
      <h2>📚 학습 세트를 선택해봐!</h2>
      <div className="menu-grid">
        {sets.map((set) => (
          <button 
            key={set.id} 
            className="menu-card"
            onClick={() => {
              onSelectSet(set); 
              navigate('/set-detail');
            }}
          >
            <span className="menu-icon">📁</span>
            <span>{set.title}</span>
            <small style={{fontSize: '0.7rem', color: '#888'}}>{set.data.length} 단어</small>
            <svg onClick={(e) => {e.stopPropagation(); handleDeleteSet(set.id, set.title);}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SetSelector;