import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, onValue, set, get } from 'firebase/database';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [registrations, setRegistrations] = useState([]);
  const [completions, setCompletions] = useState([]);
  const [completionStats, setCompletionStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get total participants from Firebase
    const totalRef = ref(database, 'admin_settings/total_participants');
    get(totalRef).then((snapshot) => {
      if (snapshot.exists()) {
        setTotalParticipants(snapshot.val());
      }
    });

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

    // Listen to completion_stats to get completed counts per practice case
    const completionStatsRef = ref(database, 'completion_stats');
    const unsubscribeCompletionStats = onValue(completionStatsRef, (snapshot) => {
      const data = snapshot.val();
      console.log('📊 Admin received completion_stats update:', data);
      if (data) {
        // Extract completed count for each practice case
        const stats = {};
        Object.entries(data).forEach(([completionId, statsObj]) => {
          stats[completionId] = statsObj.completed || 0;
        });
        setCompletionStats(stats);
        console.log('📈 Updated completion stats:', stats);
      } else {
        setCompletionStats({});
      }
    });

    // Still listen to completions for recent activity display
    const completionsRef = ref(database, 'completions');
    const unsubscribeCompletions = onValue(completionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const completionsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setCompletions(completionsArray);
      } else {
        setCompletions([]);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeRegistrations();
      unsubscribeCompletionStats();
      unsubscribeCompletions();
    };
  }, []);

  const handleTotalParticipantsChange = async (newTotal) => {
    try {
      const totalRef = ref(database, 'admin_settings/total_participants');
      await set(totalRef, newTotal);
      setTotalParticipants(newTotal);
    } catch (error) {
      console.error('Error updating total participants:', error);
    }
  };

  const getCompletionPercentage = (completedCount) => {
    if (totalParticipants === 0) return 0;
    // Calculate percentage based on completion_stats > practice_case > completed / total_participants
    return Math.round((completedCount / totalParticipants) * 100);
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Admin paneli yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>🛠️ Admin Dashboard</h1>
          <button onClick={onLogout} className="admin-logout-btn">
            🚪 Çıkış Yap
          </button>
        </div>
      </header>

      <div className="admin-content">
        {/* Participant Counter Section */}
        <div className="admin-section">
          <h2>👥 Katılımcı Sayısı Ayarlama</h2>
          <div className="participant-counter">
            <label htmlFor="totalParticipants">Toplam Katılımcı Sayısı:</label>
            <input
              type="number"
              id="totalParticipants"
              value={totalParticipants}
              onChange={(e) => handleTotalParticipantsChange(parseInt(e.target.value) || 0)}
              min="0"
              className="participant-input"
            />
            <p className="participant-note">
              Bu sayıyı manuel olarak bootcamp sırasında kaç kişi olduğunu sayarak ayarlayın.
            </p>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="admin-section">
          <h2>📊 Genel İstatistikler</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-info">
                <h3>Toplam Katılımcı</h3>
                <div className="stat-number">{totalParticipants}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-info">
                <h3>Online Kayıt</h3>
                <div className="stat-number">{registrations.length}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>Toplam Tamamlanma</h3>
                <div className="stat-number">{Object.values(completionStats).reduce((sum, count) => sum + count, 0)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Percentages */}
        <div className="admin-section">
          <h2>📈 Pratik Bölümü Tamamlanma Oranları</h2>
          <div className="completion-list">
            {Object.entries(completionStats).map(([completionId, completedCount]) => {
              const percentage = getCompletionPercentage(completedCount);
              return (
                <div key={completionId} className="completion-item">
                  <div className="completion-info">
                    <h4>{completionId}</h4>
                    <div className="completion-numbers">
                      {completedCount} / {totalParticipants} kişi
                    </div>
                  </div>
                  <div className="completion-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="percentage-text">
                      %{percentage}
                    </div>
                  </div>
                </div>
              );
            })}
            {Object.keys(completionStats).length === 0 && (
              <div className="no-completions">
                <p>Henüz tamamlanmış pratik bölümü bulunmuyor.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="admin-section">
          <h2>🆕 Son Kayıtlar</h2>
          <div className="recent-registrations">
            {registrations.slice(-10).reverse().map(registration => (
              <div key={registration.id} className="registration-card">
                <div className="registration-info">
                  <strong>{registration.name} {registration.surname}</strong>
                  <span>{registration.email}</span>
                </div>
                <div className="registration-time">
                  {new Date(registration.registeredAt).toLocaleString('tr-TR')}
                </div>
              </div>
            ))}
            {registrations.length === 0 && (
              <div className="no-registrations">
                <p>Henüz kayıt bulunmuyor.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;