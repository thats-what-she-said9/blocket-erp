import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem('token') || null
  );

  // Attach token to axios on change
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Fetch current user if token exists
  useEffect(() => {
    async function loadUser() {
      if (!token) return;
      try {
        const res = await axios.get('/auth/me'); // we'll implement this later
        setUser(res.data);
      } catch {
        setToken(null);
      }
    }
    loadUser();
  }, [token]);

  // Signup function
  const signup = async ({ email, password, role }) => {
    await axios.post('/auth/signup', { email, password, role });
    // On signup, auto-login by calling login()
    return login({ email, password });
  };

  // Login function
  const login = async ({ email, password }) => {
    const res = await axios.post('/auth/login', { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
