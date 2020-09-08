import React from 'react';

// Assets
import shark1 from '../../assets/images/shark-1.png';
import shark2 from '../../assets/images/shark-2.png';
import shark3 from '../../assets/images/shark-3.png';

// Styles
import './styles.css';

const SharksBackground = () => {
  return (
    <>
      <div className="shark1" style={{ backgroundImage: `url(${shark1})` }} />
      <div className="shark2" style={{ backgroundImage: `url(${shark2})` }} />
      <div className="shark3" style={{ backgroundImage: `url(${shark3})` }} />
    </>
  );
};

export default SharksBackground;
