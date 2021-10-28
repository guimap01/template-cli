import React from 'react';
import { DummyErrorFallback } from './components/DummyErrorFallback';
import { DummyFallback } from './components/DummyFallback';
import ModuleLoader from './components/ModuleLoader';
import { Routes } from './routes';

const App = () => (
  <div>
    <h1>Typescript</h1>
    <h2>App 2</h2>
    <ModuleLoader
      errorFallback={<DummyErrorFallback />}
      fallback={<DummyFallback />}
    >
      <Routes />
    </ModuleLoader>
  </div>
);

export default App;
