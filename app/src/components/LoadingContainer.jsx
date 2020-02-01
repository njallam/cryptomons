import React from 'react';
import PropTypes from 'prop-types';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import LinearProgress from '@material-ui/core/LinearProgress';

const { useDrizzleState } = drizzleReactHooks;

function LoadingContainer({ children }) {
  const drizzleStatus = useDrizzleState(state => state.drizzleStatus);
  if (!drizzleStatus.initialized) {
    return <LinearProgress />;
  }
  return <>{children}</>;
}

LoadingContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default LoadingContainer;
