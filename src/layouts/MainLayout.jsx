import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu, Home, User, X, LogOut, Settings, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './MainLayout.css';

const MainLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="layout-container">
      {/* Sticky Header */}
      <header className="main-header">
        <button className="menu-btn" onClick={() => setIsDrawerOpen(true)}>
          <Menu size={28} color="var(--primary-color)" />
        </button>
        <span className="header-title">Incógnito</span>
        <div style={{ width: 28 }}></div> {/* Spacer */}
      </header>

      {/* Drawer Sidebar */}
      <div className={`drawer-overlay ${isDrawerOpen ? 'open' : ''}`} onClick={() => setIsDrawerOpen(false)}></div>
      <aside className={`drawer-sidebar ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <span className="drawer-title">Tùy chọn</span>
          <button className="close-btn" onClick={() => setIsDrawerOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="drawer-nav">
          <NavLink to="/" className={({isActive}) => isActive ? "drawer-item active" : "drawer-item"} onClick={() => setIsDrawerOpen(false)}>
            {({isActive}) => <><Home size={24} strokeWidth={isActive ? 3 : 2} /> Bảng tin</>}
          </NavLink>
          <NavLink to="/profile" className={({isActive}) => isActive ? "drawer-item active" : "drawer-item"} onClick={() => setIsDrawerOpen(false)}>
            {({isActive}) => <><User size={24} strokeWidth={isActive ? 3 : 2} /> Hồ sơ ẩn danh</>}
          </NavLink>
          <button className="drawer-item" onClick={() => alert('Thông báo sẽ được tích hợp')}>
            <Bell size={24} /> Thông báo
          </button>
          <button className="drawer-item" onClick={() => alert('Cài đặt hệ thống')}>
            <Settings size={24} /> Cài đặt
          </button>
        </nav>
        <div className="drawer-footer">
          <button className="logout-btn" onClick={() => {
            logout();
            setIsDrawerOpen(false);
          }}>
            <LogOut size={20} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content (Center) */}
      <main className="main-content">
        <Outlet /> 
      </main>

      {/* Bottom Nav (Mobile/Desktop Center) */}
      <nav className="bottom-nav">
        <NavLink to="/" className={({isActive}) => isActive ? "bottom-nav-item active" : "bottom-nav-item"}>
          {({isActive}) => <Home size={26} strokeWidth={isActive ? 3 : 2} />}
        </NavLink>
        <NavLink to="/profile" className={({isActive}) => isActive ? "bottom-nav-item active" : "bottom-nav-item"}>
          {({isActive}) => <User size={26} strokeWidth={isActive ? 3 : 2} />}
        </NavLink>
      </nav>
    </div>
  );
};

export default MainLayout;
