import React, { useState } from 'react';
import '../App.css';

// const studyData = [
//   { id: 1, eng: "Action speaks louder than words.", kor: "말보다 행동이 중요하다." },
//   { id: 2, eng: "Better late than never.", kor: "늦더라도 안 하는 것보다 낫다." },
//   { id: 3, eng: "Practice makes perfect.", kor: "연습이 완벽을 만든다." }
// ];

function Voca({ data }) { // 2. 부모(App)가 보내준 data를 여기서 받아!
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // 3. 만약 세트를 선택하기 전이라 data가 없을 때를 대비한 안전장치
    if (!data || data.length === 0) {
        return <div className="app-container">학습 데이터가 없습니다. 세트를 선택해주세요!</div>;
    }

    const studyList = Array.isArray(data) ? data : data.data;

    if (!studyList || studyList.length === 0) {
        return <div className="app-container">선택된 세트에 단어가 없습니다.</div>;
    }

    // 4. 안전장치가 보내준 데이터 사용
    const currentData = studyList[currentIndex];

    const handleNext = () => {
        if (currentIndex < studyList.length - 1) {
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
                <h1>⚡ 가성비 영어 학습</h1>
                <p>오늘의 학습 효율: 100%</p>
            </header>

            <main className="card-section">
                <div className="card-container">
                    <div 
                        className={`card-inner ${isFlipped ? 'is-flipped' : ''}`} 
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <div className="card-front">
                            <p className="eng-text">{currentData.eng}</p>
                            <button className="speak-btn" onClick={(e) => { e.stopPropagation(); speak(currentData.eng); }}>
                                🔊 들어보기
                            </button>
                        </div>
                        <div className="card-back">
                            <p className="kor-text">{currentData.kor}</p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="controls">
                <button onClick={handlePrev} disabled={currentIndex === 0}>이전</button>
                {/* 5. 여기도 studyList.length로 변경! */}
                <span className="page-number">{currentIndex + 1} / {studyList.length}</span>
                <button onClick={handleNext} disabled={currentIndex === studyList.length - 1}>다음</button>
            </footer>
        </div>
    );
}

export default Voca;