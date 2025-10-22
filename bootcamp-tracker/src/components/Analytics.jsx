import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import './Analytics.css';

const Analytics = () => {
  const [registrations, setRegistrations] = useState([]);
  const [completions, setCompletions] = useState([]);
  const [completionStats, setCompletionStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to registrations
    const registrationsRef = ref(database, 'registrations');
    const unsubscribeRegistrations = onValue(registrationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const registrationsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setRegistrations(registrationsArray);
      }
    });

    // Listen to completions
    const completionsRef = ref(database, 'completions');
    const unsubscribeCompletions = onValue(completionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const completionsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setCompletions(completionsArray);
      }
    });

    // Listen to completion stats
    const statsRef = ref(database, 'completion_stats');
    const unsubscribeStats = onValue(statsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCompletionStats(data);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeRegistrations();
      unsubscribeCompletions();
      unsubscribeStats();
    };
  }, []);

  if (loading) {
    return <div className="analytics-loading">📊 Analitik veriler yükleniyor...</div>;
  }

  return (
    <div className="analytics-container">
      <h2>🎯 Bootcamp Analytics</h2>
      
      <div className="analytics-grid">
        {/* Registration Stats */}
        <div className="analytics-card">
          <h3>👥 Katılımcılar</h3>
          <div className="stat-number">{registrations.length}</div>
          <p>Toplam kayıt</p>
        </div>

        {/* Completion Stats */}
        <div className="analytics-card">
          <h3>✅ Tamamlanmış Aktiviteler</h3>
          <div className="stat-number">{completions.filter(c => c.status).length}</div>
          <p>Toplam tamamlanma</p>
        </div>

        {/* Active Users */}
        <div className="analytics-card">
          <h3>🔥 Aktif Kullanıcılar</h3>
          <div className="stat-number">
            {new Set(completions.map(c => c.user.email)).size}
          </div>
          <p>Pratik yapan kişi</p>
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="analytics-section">
        <h3>🆕 Son Kayıtlar</h3>
        <div className="registrations-list">
          {registrations.slice(-5).reverse().map(reg => (
            <div key={reg.id} className="registration-item">
              <strong>{reg.name} {reg.surname}</strong>
              <span>{reg.email}</span>
              <small>{new Date(reg.registeredAt).toLocaleString('tr-TR')}</small>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Progress */}
      <div className="analytics-section">
        <h3>📈 Pratik Bölümü İlerlemesi</h3>
        <div className="completion-progress">
          {Object.entries(completionStats).map(([id, stats]) => (
            <div key={id} className="progress-item">
              <div className="progress-label">{id}</div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(stats.completed / registrations.length) * 100}%` }}
                />
              </div>
              <span>{stats.completed}/{registrations.length}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Completions */}
      <div className="analytics-section">
        <h3>🎉 Son Tamamlananlar</h3>
        <div className="completions-list">
          {completions.slice(-10).reverse().map(completion => (
            <div key={completion.id} className="completion-item">
              <span className={`completion-badge ${completion.status ? 'completed' : 'uncompleted'}`}>
                {completion.status ? '✅' : '❌'}
              </span>
              <strong>{completion.user.name}</strong>
              <span>{completion.completionId}</span>
              <small>{new Date(completion.timestamp).toLocaleString('tr-TR')}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;