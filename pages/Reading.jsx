import React, { useState, useEffect } from 'react';
import { speakingData } from '../data/Data';
import './Reading.css';

const Reading = ({data}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);

  // 데이터 가공 로직 (data가 있을 때만 작동하게 안전장치 추가)
  const studyList = data ? (Array.isArray(data) ? data : data.data) : [];
  const currentData = studyList[currentIndex];

  useEffect(() => {
    // currentData와 eng가 확실히 있을 때만 실행하도록 체크!
    if (currentData?.eng) { 
      const words = currentData.eng.split(" ");
      setShuffledWords([...words].sort(() => Math.random() - 0.5));
      setUserAnswer([]);
    }
  }, [currentIndex, currentData?.eng]); // 의존성 배열에도 안전장치 추가

  // 3. 로딩 및 예외 처리 (모든 훅 선언 이후에 위치!)
  if (!data || !currentData) {
    return <div className="app-container">학습 데이터를 불러오는 중입니다...</div>;
  }

  // 🔊 TTS 기능: 클릭한 단어/문장 읽어주기
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const tts = new SpeechSynthesisUtterance(text);
    tts.lang = 'en-US';
    tts.rate = 0.9;
    window.speechSynthesis.speak(tts);
  };

  const handleWordClick = (word, idx) => {
    speak(word); // 단어 클릭 시 소리나게 추가!
    setUserAnswer([...userAnswer, word]);
    setShuffledWords(shuffledWords.filter((_, i) => i !== idx));
  };

  const resetQuiz = () => {
    const words = currentData.eng.split(" ");
    setShuffledWords([...words].sort(() => Math.random() - 0.5));
    setUserAnswer([]);
  };

  const isCorrect = userAnswer.join(" ") === currentData.eng;

  return (
    <div className="page-layout">
      <div className="reading-card">
        <span className="badge">READING & QUIZ</span>
        <button className="play-all-btn" onClick={() => speak(currentData.eng)}>🔊 문장 전체 듣기</button>
        
        <p className="kor-hint">{currentData.kor}</p>

        {/* 정답 영역 */}
        <div className="answer-area">
          {userAnswer.length === 0 && <span className="placeholder">아래 단어를 클릭해 문장을 완성하세요!</span>}
          {userAnswer.map((word, i) => (
            <span key={i} className="word-selected" onClick={() => {
              // 클릭하면 다시 아래로 내려보내는 기능 (유준이를 위한 가성비 편의기능)
              setUserAnswer(userAnswer.filter((_, idx) => idx !== i));
              setShuffledWords([...shuffledWords, word]);
            }}>{word}</span>
          ))}
        </div>

        {/* 단어 풀 영역 */}
        <div className="word-pool">
          {shuffledWords.map((word, i) => (
            <button key={i} className="word-chip" onClick={() => handleWordClick(word, i)}>
              {word}
            </button>
          ))}
        </div>

        {userAnswer.length === currentData.eng.split(" ").length && (
          <div className={`quiz-feedback ${isCorrect ? 'success' : 'fail'}`}>
            {isCorrect ? "✅ 정답!" : "❌ 순서가 조금 달라요!"}
            <button className="reset-btn" onClick={resetQuiz}>🔄 다시하기</button>
          </div>
        )}
      </div>

      <div className="controls">
        <button 
          onClick={() => {
            if(currentIndex > 0) {
              setCurrentIndex(c => c - 1); 
            }
          }}
          disabled={currentIndex === 0}
        >
          이전
        </button>
        <span className="page-number">{currentIndex + 1} / {studyList.length}</span>
        <button 
          onClick={() => {
            if(currentIndex < studyList.length - 1) { // 👈 여기를 수정!
              setCurrentIndex(c => c + 1); 
            }
          }}
          disabled={currentIndex === studyList.length - 1}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Reading;