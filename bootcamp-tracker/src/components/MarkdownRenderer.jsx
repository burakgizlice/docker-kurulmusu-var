import React, { useEffect } from 'react';
import { database } from '../firebase';
import { ref, push, set, get, runTransaction } from 'firebase/database';
import './MarkdownRenderer.css';

const MarkdownRenderer = ({ content }) => {
  // Simple markdown to HTML converter
  const convertMarkdownToHtml = (markdown) => {
    if (!markdown) return '';
    
    let html = markdown
      // Convert headers
      .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      
      // Convert images with optional captions
      .replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
        if (alt) {
          return `<img src="${src}" alt="${alt}" /><div class="image-caption">${alt}</div>`;
        }
        return `<img src="${src}" alt="" />`;
      })
      
      // Convert completion buttons [COMPLETE:id]
      .replace(/\[COMPLETE:(.*?)\]/g, (match, id) => {
        return `<div class="completion-section" data-completion-id="${id}">
          <div class="completion-bar">
            <span class="completion-text">Pratik Bölümü</span>
            <button class="completion-btn" onclick="window.toggleCompletion('${id}')">
              <span class="completion-status">Pratik Kısmını Tamamladım!</span>
            </button>
          </div>
        </div>`;
      })
      
      // Convert bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      
      // Convert italic text  
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      
      // Convert inline code
      .replace(/`(.*?)`/g, '<code>$1</code>')
      
      // Convert line breaks
      .replace(/\\\n/g, '<br>')
      
      // Convert blockquotes
      .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
      
      // Convert unordered lists
      .replace(/^-   (.*$)/gm, '<li>$1</li>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      
      // Wrap consecutive list items in ul tags
      .replace(/(<li>.*<\/li>)/gs, (match) => {
        return '<ul>' + match + '</ul>';
      })
      
      // Convert numbered lists  
      .replace(/^\d+\.\s+(.*$)/gm, '<oli>$1</oli>')
      
      // Wrap consecutive ordered list items
      .replace(/(<oli>.*<\/oli>)/gs, (match) => {
        return '<ol>' + match.replace(/oli>/g, 'li>') + '</ol>';
      })
      
      // Convert paragraphs (double line breaks)
      .split('\n\n')
      .map(paragraph => {
        paragraph = paragraph.trim();
        if (!paragraph) return '';
        
        // Skip if already has HTML tags
        if (paragraph.includes('<h') || paragraph.includes('<ul>') || paragraph.includes('<ol>') || paragraph.includes('<blockquote>') || paragraph.includes('<img') || paragraph.includes('<div class="completion-section"')) {
          return paragraph;
        }
        
        // Wrap in paragraph tags
        return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
      })
      .join('\n\n');

    return html;
  };

  const htmlContent = convertMarkdownToHtml(content);

  // Firebase tracking function
  const trackCompletion = async (completionId, status, userInfo) => {
    try {
      const completionData = {
        completionId,
        status,
        timestamp: new Date().toISOString(),
        user: {
          name: userInfo?.name || 'Anonymous',
          surname: userInfo?.surname || '',
          email: userInfo?.email || 'anonymous@bootcamp.com'
        },
        sessionId: userInfo?.registeredAt || 'unknown'
      };

      // Store in Firebase under completions
      const completionsRef = ref(database, 'completions');
      await push(completionsRef, completionData);

      // Also update completion stats using atomic transaction
      const statsRef = ref(database, `completion_stats/${completionId}`);
      
      await runTransaction(statsRef, (currentData) => {
        const stats = currentData || { completed: 0, total: 0 };
        
        if (status) {
          stats.completed = (stats.completed || 0) + 1;
          console.log(`✅ Incremented ${completionId}: ${stats.completed}`);
        } else {
          stats.completed = Math.max(0, (stats.completed || 0) - 1);
          console.log(`❌ Decremented ${completionId}: ${stats.completed}`);
        }
        
        return stats;
      });
      
      console.log('✅ Completion tracked:', completionData);
    } catch (error) {
      console.error('❌ Firebase tracking error:', error);
    }
  };

  // Setup completion functionality
  useEffect(() => {
    // Global function to toggle completion status
    window.toggleCompletion = (id) => {
      const key = `completion_${id}`;
      const currentStatus = localStorage.getItem(key) === 'true';
      const newStatus = !currentStatus;
      
      localStorage.setItem(key, newStatus.toString());
      
      // Get user info from localStorage
      const userInfo = JSON.parse(localStorage.getItem('bootcamp_user'));
      
      // Track completion in Firebase
      trackCompletion(id, newStatus, userInfo);
      
      // Update the button appearance
      updateCompletionButton(id, newStatus);
    };

    // Function to update button appearance
    const updateCompletionButton = (id, isCompleted) => {
      const element = document.querySelector(`[data-completion-id="${id}"]`);
      if (element) {
        const button = element.querySelector('.completion-btn');
        const statusText = element.querySelector('.completion-status');
        
        if (isCompleted) {
          button.classList.add('completed');
          statusText.textContent = '✅ Tamamlandı!';
        } else {
          button.classList.remove('completed');
          statusText.textContent = 'Pratik Kısmını Tamamladım!';
        }
      }
    };

    // Initialize completion states from localStorage
    const initializeCompletions = () => {
      const completionElements = document.querySelectorAll('[data-completion-id]');
      completionElements.forEach(element => {
        const id = element.getAttribute('data-completion-id');
        const isCompleted = localStorage.getItem(`completion_${id}`) === 'true';
        updateCompletionButton(id, isCompleted);
      });
    };

    // Initialize after a short delay to ensure DOM is ready
    setTimeout(initializeCompletions, 100);
    
    // Cleanup function
    return () => {
      delete window.toggleCompletion;
    };
  }, [content]);

  return (
    <div 
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownRenderer;