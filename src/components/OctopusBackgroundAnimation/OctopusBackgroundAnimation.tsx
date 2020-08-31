import React from 'react';
import { motion } from 'framer-motion';

// Assets
import octopus1 from '../../assets/images/octopus-1.png';
import octopus3 from '../../assets/images/octopus-3.png';

// Styles
import './styles.css';

const OctopusBackgroundAnimation = () => {
  return (
    <>
      <motion.div
        className="octopus3"
        animate={{ y: [-10, 10] }}
        transition={{ yoyo: Infinity, ease: 'easeInOut', duration: 4.5 }}
        style={{
          backgroundImage: `url(${octopus3})`,
        }}
      />
      <motion.div
        className="octopus1"
        animate={{ y: [-10, 10] }}
        transition={{ yoyo: Infinity, ease: 'easeInOut', duration: 3 }}
        style={{
          backgroundImage: `url(${octopus1})`,
        }}
      />
    </>
  );
};

export default OctopusBackgroundAnimation;
