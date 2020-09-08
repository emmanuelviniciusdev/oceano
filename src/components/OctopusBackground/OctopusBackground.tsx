import React from 'react';

// Assets
import octopus1 from '../../assets/images/octopus-1.png';
import octopus3 from '../../assets/images/octopus-3.png';

// Styles
import './styles.css';

const OctopusBackground = () => {
  return (
    <>
      <div
        className="octopus3"
        style={{
          backgroundImage: `url(${octopus3})`,
        }}
      />
      <div
        className="octopus1"
        style={{
          backgroundImage: `url(${octopus1})`,
        }}
      />
    </>
  );
};

export default OctopusBackground;
