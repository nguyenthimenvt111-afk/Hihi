import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import '../styles/Auth.css'; // Đảm bảo bạn đã có file CSS cho Pure Black theme

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation cơ bản
    if (!email.trim() || !password.trim()) {
      return setErrorMsg('Vui lòng nhập đầy đủ Email và Mật khẩu!');
    }
    if (password.length < 6) {
      return setErrorMsg('Mật khẩu phải có ít nhất 6 ký tự!');
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Xử lý Đăng nhập
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        navigate('/'); // Đăng nhập thành công -> Về trang chủ
      } else {
        // Xử lý Đăng ký
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        // Nếu bạn CHƯA chạy mã Trigger SQL tự động, đoạn code này sẽ giúp insert dữ liệu
        if (data?.user) {
          const names = ['Thỏ Bí Ẩn', 'Cú Đêm', 'Gấu Xám', 'Cáo Tuyết', 'Sói Độc Đắc', 'Mèo Hoang', 'Đại Bàng'];
          const randomName = names[Math.floor(Math.random() * names.length)];
          
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([{ id: data.user.id, anonymous_name: randomName }]);
            
          if (profileError) throw profileError;
        }

        navigate('/'); // Đăng ký thành công -> Về trang chủ
      }
    } catch (error) {
      setErrorMsg(error.message || 'Đã có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="auth-card" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <h2 className="auth-title" style={{ color: '#fff', textAlign: 'center', marginBottom: '2rem' }}>
          {isLogin ? 'Đăng nhập' : 'Tạo danh tính mới'}
        </h2>
        
        {/* Hiển thị thông báo lỗi màu đỏ */}
        {errorMsg && (
          <div style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', color: '#ff4444', padding: '10px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #ff4444' }}>
            {errorMsg}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            className="auth-input" 
            placeholder="Email của bạn" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '12px', backgroundColor: 'transparent', border: '1px solid #2f3336', color: '#fff', borderRadius: '8px', outline: 'none' }}
          />
          <input 
            type="password" 
            className="auth-input" 
            placeholder="Mật khẩu" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '12px', backgroundColor: 'transparent', border: '1px solid #2f3336', color: '#fff', borderRadius: '8px', outline: 'none' }}
          />
          <button 
            type="submit" 
            className="auth-btn" 
            disabled={loading}
            style={{ padding: '12px', backgroundColor: '#1d9bf0', color: '#fff', border: 'none', borderRadius: '9999px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
          >
            {loading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập an toàn' : 'Đăng ký ẩn danh')}
          </button>
        </form>

        <div 
          className="auth-toggle" 
          onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }}
          style={{ color: '#71767b', textAlign: 'center', marginTop: '20px', cursor: 'pointer', fontSize: '14px' }}
        >
          {isLogin ? 'Bạn là người mới? ' : 'Đã có tài khoản? '}
          <span style={{ color: '#1d9bf0' }}>{isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}</span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
