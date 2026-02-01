import React, { useState } from 'react';
import '../App.css';

const studyData = [
  { id: 1, eng: "Action speaks louder than words.", kor: "말보다 행동이 중요하다." },
  { id: 2, eng: "Better late than never.", kor: "늦더라도 안 하는 것보다 낫다." },
  { id: 3, eng: "Practice makes perfect.", kor: "연습이 완벽을 만든다." }
];

function Voca() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const currentData = studyData[currentIndex];

    // 다음 카드로 갈 때 뒤집힘 상태 초기화
    const handleNext = () => {
    if (currentIndex < studyData.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsFlipped(false);
    }
    };

    const handlePrev = () => {
    if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setIsFlipped(false);
    }
    };

    const speak = (text) => {
    window.speechSynthesis.cancel();
    const tts = new SpeechSynthesisUtterance(text);
    tts.lang = 'en-US';
    window.speechSynthesis.speak(tts);
    };

    return (
    <div className="app-container">
        <header>
        <h1>⚡ 가성비 영어 학습 (React v1)</h1>
        <p>오늘의 학습 효율: 100%</p>
        </header>

        <main className="card-section">
        <div className="card-container">
            <div 
            className={`card-inner ${isFlipped ? 'is-flipped' : ''}`} 
            onClick={() => setIsFlipped(!isFlipped)}
            >
            {/* 앞면: 영어 (원아워 스타일 소리 포함) */}
            <div className="card-front">
                <p className="eng-text">{currentData.eng}</p>
                <button className="speak-btn" onClick={(e) => { e.stopPropagation(); speak(currentData.eng); }}>
                🔊 들어보기
                </button>
            </div>
            {/* 뒷면: 한국어 (클래스카드 스타일) */}
            <div className="card-back">
                <p className="kor-text">{currentData.kor}</p>
            </div>
            </div>
        </div>
        </main>

        <footer className="controls">
        <button onClick={handlePrev} disabled={currentIndex === 0}>이전</button>
        <span className="page-info">{currentIndex + 1} / {studyData.length}</span>
        <button onClick={handleNext} disabled={currentIndex === studyData.length - 1}>다음</button>
        </footer>
    </div>
    );
}

export default Voca;