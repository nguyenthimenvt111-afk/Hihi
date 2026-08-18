import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import './styles/variables.css';

// Context
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Auth from './pages/Auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Các trang không cần đăng nhập */}
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />

          {/* Các trang bắt buộc đăng nhập (Được bọc trong ProtectedRoute) */}
          <Route element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          
          {/* Fallback 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
