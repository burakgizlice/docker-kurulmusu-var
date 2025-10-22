import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, push, onValue, off } from 'firebase/database';
import './CompletionTracker.css';

const CompletionTracker = () => {
  const [completionCount, setCompletionCount] = useState(0);
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Listen to completion count changes
    const completionRef = ref(database, 'completions');
    
    const unsubscribe = onValue(completionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const count = Object.keys(data).length;
        setCompletionCount(count);
      } else {
        setCompletionCount(0);
      }
    });

    // Check if user has already completed (basic check using localStorage)
    const userCompleted = localStorage.getItem('bootcamp-completed');
    if (userCompleted) {
      setHasCompleted(true);
    }

    // Cleanup listener on unmount
    return () => off(completionRef);
  }, []);

  const handleCompletion = async () => {
    if (hasCompleted || isLoading) return;

    setIsLoading(true);
    
    try {
      // Add completion to Firebase
      const completionRef = ref(database, 'completions');
      await push(completionRef, {
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        completedAt: new Date().toISOString()
      });

      // Mark as completed locally
      localStorage.setItem('bootcamp-completed', 'true');
      setHasCompleted(true);
      
    } catch (error) {
      console.error('Error recording completion:', error);
      alert('Error recording completion. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const completionPercentage = totalAttendees > 0 ? Math.round((completionCount / totalAttendees) * 100) : 0;

  return (
    <div className="completion-tracker">
      <div className="completion-stats">
        <h3>Bootcamp Progress</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{completionCount}</span>
            <span className="stat-label">Completed</span>
          </div>
          {totalAttendees > 0 && (
            <div className="stat-item">
              <span className="stat-number">{completionPercentage}%</span>
              <span className="stat-label">Progress</span>
            </div>
          )}
        </div>
      </div>

      <button 
        className={`completion-button ${hasCompleted ? 'completed' : ''} ${isLoading ? 'loading' : ''}`}
        onClick={handleCompletion}
        disabled={hasCompleted || isLoading}
      >
        {isLoading ? 'Recording...' : hasCompleted ? '✓ Completed!' : 'I Completed This!'}
      </button>

      {hasCompleted && (
        <p className="completion-message">
          Thank you for participating! Your completion has been recorded.
        </p>
      )}
    </div>
  );
};

export default CompletionTracker;