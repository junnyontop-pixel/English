import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase'; // 설정한 위치에 맞게 수정
import './SetStore.css';

const SetStore = () => {
  const [storeSets, setStoreSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStoreSets();
  }, []);

  // 1. 모든 공개 세트 가져오기
  const fetchStoreSets = async () => {
    try {
      const { data, error } = await supabase
        .from('study_sets')
        .select('*')
        .not('title', 'ilike', '%(가져옴)%')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStoreSets(data || []);
    } catch (error) {
      console.error('스토어 로딩 실패:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. 내 학습장으로 세트 복사하기 (핵심!)
  const handleImport = async (set) => {
    const { data: { user } } = await supabase.auth.getUser();

    console.log("복사할 데이터:", set.data);

    if (!user) {
      alert("로그인이 필요해! 😅");
      return;
    }

    // 최소 노력: 기존 데이터에서 user_id만 내 걸로 바꿔서 새로 넣기
    const { error } = await supabase
      .from('study_sets')
      .insert([{
        title: `${set.title} (가져옴)`,
        data: set.data,
        user_id: user.id // 👈 이제 이 세트의 주인은 유준이!
      }]);

    if (error) {
      alert("가져오기 실패: " + error.message);
    } else {
      alert(`'${set.title}' 세트를 내 학습장에 담았어! 🚀`);
    }
  };

  if (loading) return <div>열심히 세트를 가져오는 중... 🛒</div>;

  return (
    <div className="store-container">
      <h2>🛒 세트 스토어</h2>
      <p>다른 사람들이 만든 꿀맛 단어장을 가져와봐!</p>
      
      <div className="store-grid">
        {storeSets.map((set) => (
          <div key={set.id} className="store-card">
            <h3>📂 {set.title}</h3>
            <p>🔤 단어 {set.data?.length || 0}개</p>
            {/* 만든 사람 이름도 나오게 하려면 DB에 user_name 컬럼이 있어야 해! */}
            <button className="import-btn" onClick={() => handleImport(set)}>
              내 서재에 담기 📥
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetStore;