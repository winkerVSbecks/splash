import React from 'react';

/**
 * SVG Canvas
 * This component generates the base SVG
 * and sets up all the sub-components
 */
function Canvas({ w, h, children, bgColor = 'transparent' }) {
  const viewBox = [0, 0, w, h].join(' ');
  const styles = {
    display: 'block',
    backgroundColor: bgColor,
    maxWidth: '400px',
    width: '100%',
    margin: '0 auto',
  };

  return (
    <svg version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={ viewBox }
      style={ styles }>
      { children }
    </svg>
  );
}

Canvas.propTypes = {
  h: React.PropTypes.number.isRequired,
  w: React.PropTypes.number.isRequired,
  children: React.PropTypes.node,
  bgColor: React.PropTypes.string,
};

export default Canvas;
