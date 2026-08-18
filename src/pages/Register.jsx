import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

const NAMES = ["Thỏ Bí Ẩn", "Cú Đêm", "Gấu Xám", "Cáo Tuyết", "Sói Độc Đắc", "Mèo Hoang", "Đại Bàng", "Sư Tử Trầm Lặng"];

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Validation: Kiểm tra dữ liệu đầu vào
    if (!email.trim() || !password.trim()) {
      setError('Vui lòng điền đầy đủ Email và Mật khẩu!');
      return;
    }
    
    if (password.length < 6) {
      setError('Mật khẩu phải chứa ít nhất 6 ký tự!');
      return;
    }

    try {
      setLoading(true);
      
      // 2. Gọi API đăng ký
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // 3. Xử lý lưu trữ đồng bộ: Tự động chèn Profile
      if (data?.user) {
        const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
        
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              anonymous_name: randomName,
              created_at: new Date().toISOString()
            }
          ]);
          
        if (profileError) {
          console.error('Lỗi khi lưu thông tin profile:', profileError);
          // Có thể hiển thị lỗi nếu muốn chặn luồng ở đây
        }

        // 4. Chuyển hướng ngay lập tức về trang chủ Dashboard (Bảng tin)
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi hệ thống khi đăng ký.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <form onSubmit={handleRegister} style={{ width: '100%', maxWidth: '400px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '32px' }}>Tạo danh tính</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Tham gia cộng đồng ẩn danh lớn nhất.</p>
        
        {/* Hiển thị lỗi Validation */}
        {error && (
          <div style={{ padding: '12px', backgroundColor: 'rgba(244, 33, 46, 0.1)', color: 'var(--error-color)', borderRadius: '4px', border: '1px solid var(--error-color)' }}>
            {error}
          </div>
        )}
        
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Địa chỉ Email" 
          style={{ width: '100%', padding: '16px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-primary)', fontSize: '16px', outline: 'none' }}
        />
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu" 
          style={{ width: '100%', padding: '16px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-primary)', fontSize: '16px', outline: 'none' }}
        />
        <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', marginTop: '8px', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Đang tạo...' : 'Đăng ký ẩn danh'}
        </button>
        
        <div style={{ marginTop: '20px', color: 'var(--text-secondary)', textAlign: 'center' }}>
          Đã có tài khoản? <Link to="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
