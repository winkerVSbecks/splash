import React, { Component } from 'react';
import TweenMax, { Sine } from 'gsap';

class Nucleus extends Component {
  componentDidMount() {
    const { r } = this.props;

    TweenMax.fromTo(this.refs.circle, 1, {
      attr: { r: r },
    }, {
      attr: { r: r / 8, },
      ease: Sine.easeInOut,
      yoyo: true,
      repeat: -1,
    });
  }

  render() {
    const { x, y, r, fill } = this.props;

    return (
      <circle ref="circle"
        cx={ x } cy={ y }
        r={ r }
        fill={ fill } />
    );
  }
}

Nucleus.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  r: React.PropTypes.number.isRequired,
  fill: React.PropTypes.string.isRequired,
};

export default Nucleus;
