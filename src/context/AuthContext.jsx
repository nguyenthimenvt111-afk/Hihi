import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Để cho UI có thể test ngay cả khi chưa cắm Supabase thật,
    // ta mock tạm thời một user nếu chưa có key thật.
    const isMock = import.meta.env.VITE_SUPABASE_URL === undefined;
    
    if (isMock) {
      const mockUser = localStorage.getItem('mock_user');
      if (mockUser) setUser(JSON.parse(mockUser));
      setLoading(false);
      return;
    }

    // Luồng Supabase thật
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (import.meta.env.VITE_SUPABASE_URL === undefined) {
      const mockUser = { id: '123', email, mock: true };
      localStorage.setItem('mock_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return { data: { user: mockUser }, error: null };
    }
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const logout = async () => {
    if (import.meta.env.VITE_SUPABASE_URL === undefined) {
      localStorage.removeItem('mock_user');
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
