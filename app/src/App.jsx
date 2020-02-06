import React from 'react';
import { Drizzle } from '@drizzle/store';
import { drizzleReactHooks } from '@drizzle/react-plugin';

import drizzleOptions from './drizzleOptions';
import Home from './components/Home';
import LoadingContainer from './components/LoadingContainer';

const drizzle = new Drizzle(drizzleOptions);
const { DrizzleProvider } = drizzleReactHooks;

function App() {
  return (
    <DrizzleProvider drizzle={drizzle}>
      <LoadingContainer>
        <Home />
      </LoadingContainer>
    </DrizzleProvider>
  );
}

export default App;
