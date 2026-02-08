import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

const SetAdmin = ({ user }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [wordList, setWordList] = useState([]); // [{id, eng, kor}] 형태로 저장
  
  // 현재 입력 중인 단어 상태
  const [currentEng, setCurrentEng] = useState("");
  const [currentKor, setCurrentKor] = useState("");

  // 1. 리스트에 한 줄 추가 (가성비 입력!)
  const addRow = () => {
    if (!currentEng || !currentKor) return alert("영어와 뜻을 모두 입력해줘!");
    
    const newRow = {
      id: Date.now(), // 고유 ID 생성
      eng: currentEng.trim(),
      kor: currentKor.trim()
    };

    setWordList([...wordList, newRow]);
    setCurrentEng(""); // 입력창 비우기
    setCurrentKor("");
  };

  // 2. 리스트에서 특정 줄 삭제
  const removeRow = (id) => {
    setWordList(wordList.filter(item => item.id !== id));
  };

  // 3. DB에 최종 저장
  const handleSave = async () => {
    if (!title || wordList.length === 0) return alert("제목과 단어를 입력해줘!");

    const { error } = await supabase
      .from('study_sets')
      .insert([{ title, data: wordList, user_id: user.id }]); // user_id 추가

    if (error) alert("실패: " + error.message);
    else {
      alert("DB 저장 성공! 🚀");
      navigate("/set-selector");
    }
  };

  return (
    <div className="admin-container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>🆕 세트 만들기 (행 추가 방식)</h2>
      
      <input 
        style={inputStyle} 
        placeholder="세트 제목 (예: 토익 필수)" 
        value={title}
        onChange={(e) => setTitle(e.target.value)} 
      />

      <hr />

      {/* 단어 입력 영역 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          style={{ flex: 1, padding: '10px' }} 
          placeholder="English" 
          value={currentEng}
          onChange={(e) => setCurrentEng(e.target.value)}
        />
        <input 
          style={{ flex: 1, padding: '10px' }} 
          placeholder="한글 뜻" 
          value={currentKor}
          onChange={(e) => setCurrentKor(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addRow()} // 엔터 치면 바로 추가!
        />
        <button onClick={addRow} style={addBtnStyle}>추가</button>
      </div>

      {/* 추가된 단어 목록 미리보기 */}
      <div className="word-preview-list">
        {wordList.map((item, index) => (
          <div key={item.id} style={rowStyle}>
            <span>{index + 1}. <strong>{item.eng}</strong> - {item.kor}</span>
            <button onClick={() => removeRow(item.id)} style={delBtnStyle}>삭제</button>
          </div>
        ))}
      </div>

      {wordList.length > 0 && (
        <button onClick={handleSave} style={saveBtnStyle}>이대로 DB 저장하기</button>
      )}
    </div>
  );
};

// 가성비 스타일
const inputStyle = { width: '100%', padding: '12px', marginBottom: '10px', fontSize: '1.1rem' };
const rowStyle = { display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f4f4f4', marginBottom: '5px', borderRadius: '5px' };
const addBtnStyle = { padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const delBtnStyle = { backgroundColor: '#ff4d4d', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' };
const saveBtnStyle = { width: '100%', padding: '15px', marginTop: '20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '1.1rem', cursor: 'pointer' };

export default SetAdmin;