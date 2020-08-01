import React from 'react';
import '../../assets/sass/components/StatBar.scss';

const StatBar = ({ base }) => {
  const width = base ? (base * 100) / 255 : 0;
  return (
    <div className="StatBar">
      <div
        className="StatBar-bar-percentage"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default StatBar;
