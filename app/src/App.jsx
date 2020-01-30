import React from 'react';
import { Drizzle } from '@drizzle/store';
import { drizzleReactHooks } from '@drizzle/react-plugin';

import './App.css';
import drizzleOptions from './drizzleOptions';
import MyComponent from './components/MyComponent';
import LoadingContainer from './components/LoadingContainer';

const drizzle = new Drizzle(drizzleOptions);
const { DrizzleProvider } = drizzleReactHooks;

function App() {
  return (
    <DrizzleProvider drizzle={drizzle}>
      <LoadingContainer>
        <MyComponent />
      </LoadingContainer>
    </DrizzleProvider>
  );
}

export default App;
