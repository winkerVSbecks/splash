import React, { Component } from 'react';
import TweenMax, { Sine } from 'gsap';

class Crest extends Component {
  componentDidMount() {
    const { count, center, circleSize, offset, radius, delay } = this.props;
    const offsetToC = offsetTo(center);
    const theta = 2 * Math.PI / count;
    const delta = offset ? theta / 2 : 0;

    Array(count).fill().forEach((_, idx) => {
      const start = getLocation(theta, delta, idx, radius, offsetToC);
      const end = getLocation(theta, delta, idx, radius * 0.5, offsetToC);

      TweenMax.fromTo(this.refs[idx], 1, {
        attr: { r: circleSize, cx: start.x, cy: start.y },
      }, {
        attr: { r: circleSize / 8, cx: end.x, cy: end.y },
        ease: Sine.easeInOut,
        delay,
        yoyo: true,
        repeat: -1,
      });
    });
  }

  render() {
    const { count, circleSize, radius, center, offset, fill } = this.props;
    const theta = 2 * Math.PI / count;
    const delta = offset ? theta / 2 : 0;
    const nodes = Array(count).fill();

    return (
      <g>
        { getCircles(theta, delta, radius, circleSize, fill, center, nodes) }
      </g>
    );
  }
}

Crest.propTypes = {
  count: React.PropTypes.number.isRequired,
  circleSize: React.PropTypes.number.isRequired,
  center: React.PropTypes.object.isRequired,
  fill: React.PropTypes.string.isRequired,
  offset: React.PropTypes.bool.isRequired,
};

export default Crest;

function getCircles(theta, delta, radius, circleR, fill, center, nodes) {
  const offsetToC = offsetTo(center);

  return nodes.map((_, idx) => {
    const l = getLocation(theta, delta, idx, radius, offsetToC);
    return (
      <circle key={ idx }
        ref={ idx }
        cx={ l.x } cy={ l.y }
        r={ circleR }
        fill={ fill }
        strokeWidth={ circleR * 0.2 } />
    );
  });
}

function getLocation(theta, delta, idx, r, offsetToC) {
  return polarToCartesian(delta + theta * idx, r, offsetToC);
}

function polarToCartesian(theta, r, offsetToC) {
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta);
  return offsetToC({ x, y });
}

function offsetTo(center) {
  return function offsetToC({ x, y }) {
    return {
      x: center.x + x,
      y: center.y - y,
    };
  };
}
