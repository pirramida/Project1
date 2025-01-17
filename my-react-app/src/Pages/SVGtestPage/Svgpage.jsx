import React, { useState } from 'react';

const SvgColorChangePage = () => {
  const [color1, setColor1] = useState('#FF6347');
  const [color2, setColor2] = useState('#4682B4');

  const handleCircleClick = () => {
    setColor1(color1 === '#FF6347' ? '#32CD32' : '#FF6347');
  };

  const handleRectClick = () => {
    setColor2(color2 === '#4682B4' ? '#FFD700' : '#4682B4');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <svg width="400" height="200" viewBox="0 0 400 200">
        <circle cx="100" cy="100" r="50" fill={color1} onClick={handleCircleClick} />
        <rect x="200" y="50" width="100" height="300" fill={color2} onClick={handleRectClick} />
      </svg>
    </div>
  );
};

export default SvgColorChangePage;
