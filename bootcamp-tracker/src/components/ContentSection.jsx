import React from 'react';
import './ContentSection.css';

const ContentSection = ({ title, content, imageUrl, imageAlt }) => {
  // Function to render formatted content (supports basic markdown-like formatting)
  const renderContent = (text) => {
    if (!text) return null;
    
    // Split by paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      if (!paragraph.trim()) return null;
      
      // Simple formatting: **bold**, *italic*, `code`
      let formattedText = paragraph
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>');
      
      return (
        <p 
          key={index} 
          dangerouslySetInnerHTML={{ __html: formattedText }}
          className="content-paragraph"
        />
      );
    });
  };

  return (
    <div className="content-section">
      {title && <h2 className="section-title">{title}</h2>}
      
      {imageUrl && (
        <div className="image-container">
          <img src={imageUrl} alt={imageAlt || title} className="section-image" />
        </div>
      )}
      
      <div className="section-content">
        {renderContent(content)}
      </div>
    </div>
  );
};

export default ContentSection;