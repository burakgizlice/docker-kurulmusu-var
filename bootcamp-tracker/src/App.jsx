import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MarkdownRenderer from './components/MarkdownRenderer'
import UserRegistration from './components/UserRegistration'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import { database } from './firebase'
import { ref, push } from 'firebase/database'
import { modules } from './data/moduleData'
import './App.css'

// Main bootcamp component
function BootcampApp() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [user, setUser] = useState(null);

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('bootcamp_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Handle user registration
  const handleUserRegister = async (userData) => {
    const userInfo = {
      ...userData,
      registeredAt: new Date().toISOString()
    };
    
    localStorage.setItem('bootcamp_user', JSON.stringify(userInfo));
    setUser(userInfo);

    // Track registration in Firebase
    try {
      const registrationsRef = ref(database, 'registrations');
      await push(registrationsRef, {
        ...userInfo,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
      console.log('✅ User registration tracked:', userInfo.name);
    } catch (error) {
      console.error('❌ Registration tracking error:', error);
    }
  };

  // Handle user logout (for testing purposes)
  const handleLogout = () => {
    localStorage.removeItem('bootcamp_user');
    setUser(null);
  };

  // If no user is registered, show registration form
  if (!user) {
    return (
      <div className="bootcamp-app-wrapper">
        <UserRegistration onUserRegister={handleUserRegister} />
      </div>
    );
  }

  const goToPrevious = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  const currentModule = modules[currentModuleIndex];

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1>Docker: Kurulmuşu Var!</h1>
        </div>
        <div className="module-info">
          <span className="current-module">{currentModule.title}</span>
        </div>
        <div className="user-info">
          <span className="user-greeting">Merhaba, {user.name}!</span>
          <button className="logout-btn" onClick={handleLogout} title="Çıkış Yap">
            👋
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="module-container">
          <MarkdownRenderer content={currentModule.content} />
        </div>
      </main>

      <nav className="app-navigation">
        <button 
          className="nav-button prev" 
          onClick={goToPrevious}
          disabled={currentModuleIndex === 0}
        >
          ← Önceki Modül
        </button>
        
        <div className="page-indicator">
          {modules.map((_, index) => (
            <button
              key={index}
              className={`page-dot ${index === currentModuleIndex ? 'active' : ''}`}
              onClick={() => setCurrentModuleIndex(index)}
              title={modules[index].title}
            />
          ))}
        </div>

        <button 
          className="nav-button next" 
          onClick={goToNext}
          disabled={currentModuleIndex === modules.length - 1}
        >
          Sonraki Modül →
        </button>
      </nav>
    </div>
  )
}

// Admin component with login state
function AdminApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAdminLogin = () => {
    setIsLoggedIn(true);
  };

  const handleAdminLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <AdminDashboard onLogout={handleAdminLogout} />
      ) : (
        <AdminLogin onLogin={handleAdminLogin} />
      )}
    </>
  );
}

// Main App with routing
function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/docker-kurulmusu-var' : '';
  
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<BootcampApp />} />
        <Route path="/admin" element={<AdminApp />} />
      </Routes>
    </Router>
  )
}

export default App
