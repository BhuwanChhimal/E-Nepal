import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Fetch user information
      axios.get('http://localhost:5001/api/auth/me')
        .then(response => setUser(response.data))
        .catch(error => console.error('Error fetching user data:', error));
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem('token', token); //sets unique token on login by a user
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};