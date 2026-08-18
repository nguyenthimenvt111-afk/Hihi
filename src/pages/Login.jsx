import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email || 'demo@anon.com', password || 'password');
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '32px' }}>Đăng nhập</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Dự án đã bảo vệ! Đăng nhập để vào Bảng tin.</p>
        
        <input 
          type="text" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email hoặc Tên ẩn danh" 
          style={{ width: '100%', padding: '16px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-primary)', fontSize: '16px', outline: 'none' }}
        />
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu" 
          style={{ width: '100%', padding: '16px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-primary)', fontSize: '16px', outline: 'none' }}
        />
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', marginTop: '8px' }}>
          Đăng nhập an toàn
        </button>
        
        <div style={{ marginTop: '20px', color: 'var(--text-secondary)', textAlign: 'center' }}>
          Bạn là người mới? <Link to="/register" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Đăng ký ngay</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
