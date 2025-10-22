import React, { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    
    if (credentials.username === adminUsername && credentials.password === adminPassword) {
      onLogin(true);
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>🔐 Admin Panel</h1>
          <h2>Docker Bootcamp Yönetici Girişi</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && (
            <div className="admin-error-message">
              {error}
            </div>
          )}
          
          <div className="admin-form-group">
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Kullanıcı adını giriniz"
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Şifrenizi giriniz"
              required
            />
          </div>

          <button type="submit" className="admin-login-btn">
            🚀 Admin Panel'e Giriş
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Admin paneline erişmek için geçerli kimlik bilgilerinizi giriniz.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;