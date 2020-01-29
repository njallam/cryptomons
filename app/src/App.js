import React, { Component } from 'react';
import { Drizzle } from '@drizzle/store';
import { DrizzleContext } from '@drizzle/react-plugin';

import './App.css';

import drizzleOptions from './drizzleOptions';
import MyComponent from './MyComponent';

const drizzle = new Drizzle(drizzleOptions);

class App extends Component {
  render() {
    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <MyComponent />
      </DrizzleContext.Provider>
    );
  }
}

export default App;
