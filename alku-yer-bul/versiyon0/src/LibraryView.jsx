import React from 'react';
import './LibraryView.css';

const LibraryView = () => {
  // Generate chairs for each side of a table (10 chairs per side)
  const generateChairs = (side) => {
    const chairs = [];
    for (let i = 0; i < 10; i++) {
      chairs.push(
        <div key={`${side}-${i}`} className={`chair chair-${side}`} style={{
          left: `${8 + i * 8}%`
        }}></div>
      );
    }
    return chairs;
  };

  return (
    <div className="library-container">
      <h1>ALKÜ Kütüphane</h1>
      <div className="library-floor">
        {/* Table Row 1 */}
        <div className="table-row">
          <div className="long-table">
            <div className="glass-barrier"></div>
            {generateChairs('top')}
            {generateChairs('bottom')}
          </div>
        </div>

        {/* Table Row 2 */}
        <div className="table-row">
          <div className="long-table">
            <div className="glass-barrier"></div>
            {generateChairs('top')}
            {generateChairs('bottom')}
          </div>
        </div>

        {/* Table Row 3 */}
        <div className="table-row">
          <div className="long-table">
            <div className="glass-barrier"></div>
            {generateChairs('top')}
            {generateChairs('bottom')}
          </div>
        </div>

        {/* Table Row 4 */}
        <div className="table-row">
          <div className="long-table">
            <div className="glass-barrier"></div>
            {generateChairs('top')}
            {generateChairs('bottom')}
          </div>
        </div>

        {/* Table Row 5 */}
        <div className="table-row">
          <div className="long-table">
            <div className="glass-barrier"></div>
            {generateChairs('top')}
            {generateChairs('bottom')}
          </div>
        </div>

        {/* Table Row 6 */}
        <div className="table-row">
          <div className="long-table">
            <div className="glass-barrier"></div>
            {generateChairs('top')}
            {generateChairs('bottom')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryView;