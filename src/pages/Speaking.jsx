import React, { useState } from 'react';
import { speakingData } from '../data/Data';
import './Speaking.css';

const Speaking = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userText, setUserText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState("");
  const currentData = speakingData[currentIndex];

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("브라우저 미지원");

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true; // 실시간으로 변하는 걸 보여줘야 유준이가 덜 답답해!

    recognition.onstart = () => {
      setIsListening(true);
      setUserText("");
      setResult("기다리고 있어요... 말씀해주세요!");
    };

    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript;
      setUserText(speech);
      
      // 인식이 확정되면 채점
      if (event.results[0].isFinal) {
        checkAnswer(speech);
      }
    };

    recognition.onerror = (e) => {
      if (e.error !== 'aborted') {
        setResult(`에러: ${e.error}. 다시 시도해보세요!`);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      // 인식이 끝났는데 아무 말도 안 찍혔을 때만 안내
      setTimeout(() => {
        setResult(prev => {
          if (prev === "기다리고 있어요... 말씀해주세요!") {
            return "⚠️ 목소리는 들리는데 영어로 인식이 안 돼요. 괴성 말고 문장을 또박또박! 😂";
          }
          return prev;
        });
      }, 500);
    };

    recognition.start();
  };

  const checkAnswer = (input) => {
    const cleanIn = input.toLowerCase().replace(/[.,!?]/g, "").trim();
    const cleanAns = currentData.eng.toLowerCase().replace(/[.,!?]/g, "").trim();
    
    if (cleanIn === cleanAns) {
      setResult("✅ 완벽해요! 정답입니다.");
    } else {
      setResult(`❌ 조금 달라요. (인식된 말: "${input}")`);
    }
  };

  return (
    <div className="page-layout">
      <div className="speaking-card">
        <span className="badge">SPEAKING</span>
        <p className="kor-hint">{currentData.kor}</p>
        <h2 className="eng-target">{currentData.eng}</h2>
        
        <div className="result-box">
          <p className="user-speech">내 발음: {userText || "..."}</p>
          <p className={`result-msg ${result.includes('✅') ? 'success' : 'fail'}`}>{result}</p>
        </div>

        <div className="btn-group">
          <button 
            className={`mic-btn ${isListening ? 'active' : ''}`} 
            onClick={startListening}
            disabled={isListening} 
          >
            {isListening ? "🎙️ 분석 중..." : "🎤 버튼 누르고 말하기"}
          </button>
        </div>
      </div>

      <div className="controls">
        <button onClick={() => {if(currentIndex > 0) {setCurrentIndex(c=>c-1); setUserText(""); setResult("");}}}>이전</button>
        <button onClick={() => {if(currentIndex < speakingData.length-1) {setCurrentIndex(c=>c+1); setUserText(""); setResult("");}}}>다음</button>
      </div>
    </div>
  );
};

export default Speaking;