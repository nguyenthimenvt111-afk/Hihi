import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Lấy thông tin tài khoản hiện tại từ Auth
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw userError;
        
        setEmail(user.email);

        // Lấy thông tin ẩn danh từ bảng profiles
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);
      } catch (error) {
        console.error('Lỗi khi tải hồ sơ:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) return <div style={{ color: '#fff', padding: '2rem', textAlign: 'center' }}>Đang tải hồ sơ...</div>;

  return (
    <div style={{ padding: '2rem', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ borderBottom: '1px solid #2f3336', paddingBottom: '15px', marginBottom: '20px' }}>Hồ sơ ẩn danh</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        {/* Avatar Placeholder */}
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#900c3f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold' }}>
           {profile?.anonymous_name?.charAt(0) || '?'}
        </div>
        
        {/* Tên lấy trực tiếp từ CSDL */}
        <h3 style={{ fontSize: '24px', margin: 0 }}>{profile?.anonymous_name || 'Đang cập nhật...'}</h3>
        <p style={{ color: '#71767b', fontSize: '14px', margin: 0 }}>Mỗi khi bình luận, bạn sẽ mang danh tính này.</p>
        
        <button style={{ backgroundColor: 'transparent', border: '1px solid #1d9bf0', color: '#1d9bf0', padding: '8px 16px', borderRadius: '9999px', cursor: 'pointer', marginTop: '10px' }}>
           Đổi nhận dạng ngẫu nhiên
        </button>
      </div>

      {/* Box Thông tin chi tiết */}
      <div style={{ border: '1px solid #2f3336', borderRadius: '12px', padding: '20px' }}>
        <h4 style={{ margin: '0 0 15px 0', fontSize: '18px' }}>Thông tin hệ thống</h4>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ color: '#71767b' }}>Email đăng ký:</span>
          <span>{email}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <span style={{ color: '#71767b' }}>Ngày gia nhập:</span>
          <span>
            {profile?.created_at 
              ? `Tham gia vào: ${new Date(profile.created_at).toLocaleDateString('vi-VN')}` 
              : 'Đang cập nhật...'}
          </span>
        </div>

        <button 
          onClick={handleLogout}
          style={{ width: '100%', padding: '12px', backgroundColor: '#e0245e', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Đăng xuất tài khoản
        </button>
      </div>
    </div>
  );
};

export default Profile;
