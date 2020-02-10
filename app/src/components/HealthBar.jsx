import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress, withStyles, Tooltip } from '@material-ui/core';

const ColorLinearProgress = withStyles({
  root: {
    height: 10
  },
  colorPrimary: {
    backgroundColor: '#D2222D'
  },
  barColorPrimary: {
    backgroundColor: '#238823'
  }
})(LinearProgress);

function HealthBar({ health, maxHealth }) {
  const percent = (health / maxHealth) * 100;

  return (
    <Tooltip title={`Health: ${health}/${maxHealth}`} arrow>
      <ColorLinearProgress variant="determinate" value={percent} />
    </Tooltip>
  );
}

HealthBar.propTypes = {
  health: PropTypes.number.isRequired,
  maxHealth: PropTypes.number.isRequired
};

export default HealthBar;
