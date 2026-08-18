import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Chưa đăng nhập -> Chuyển hướng về login
    return <Navigate to="/login" replace />;
  }

  // Đã đăng nhập -> Cho phép vào
  return children;
};

export default ProtectedRoute;
