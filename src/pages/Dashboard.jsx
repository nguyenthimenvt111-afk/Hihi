import React, { useState } from 'react';

const NAMES = ["Thỏ Bí Ẩn", "Cú Đêm", "Gấu Xám", "Cáo Tuyết", "Sói Độc Đắc", "Mèo Hoang", "Đại Bàng", "Sư Tử Trầm Lặng"];
const COLORS = ["#f4212e", "#1d9bf0", "#00ba7c", "#ff9800", "#9c27b0", "#e91e63", "#3f51b5"];

const Dashboard = () => {
  const [posts, setPosts] = useState([
    { id: 1, author: "Gấu Xám", color: "#f4212e", content: "Đây là bảng tin ẩn danh hoàn toàn mới!", time: "2h" },
    { id: 2, author: "Cú Đêm", color: "#1d9bf0", content: "Giao diện siêu chuẩn, mượt mà với Hamburger menu.", time: "4h" }
  ]);
  const [text, setText] = useState("");

  const handlePost = () => {
    if (!text.trim()) return;
    const newPost = {
      id: Date.now(),
      author: NAMES[Math.floor(Math.random() * NAMES.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      content: text,
      time: "Vừa xong"
    };
    setPosts([newPost, ...posts]);
    setText("");
  };

  return (
    <div>
      {/* Khu vực Đăng Bài */}
      <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#444' }}></div>
        <div style={{ flex: 1 }}>
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Bạn đang nghĩ gì?" 
            style={{ 
              width: '100%', backgroundColor: 'transparent', border: 'none', 
              color: 'var(--text-primary)', fontSize: '20px', resize: 'none', outline: 'none', minHeight: '50px' 
            }} 
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button className="btn btn-primary" onClick={handlePost}>Đăng bài</button>
          </div>
        </div>
      </div>

      {/* Danh sách Bài Đăng */}
      {posts.map(post => (
        <div key={post.id} style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '12px', cursor: 'pointer' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: post.color }}></div>
          <div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontWeight: '700' }}>{post.author}</span>
              <span style={{ color: 'var(--text-secondary)' }}>· {post.time}</span>
            </div>
            <div style={{ marginTop: '4px', lineHeight: '1.5', fontSize: '15px' }}>
              {post.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
