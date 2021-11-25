import React from 'react';
import { DummyErrorFallback } from '../../components/DummyErrorFallback';
import { DummyFallback } from '../../components/DummyFallback';
import ModuleLoader from '../../components/ModuleLoader';

const DummyPage2 = React.lazy(() => import('app2/DummyPage'));

export const DummyPage = () => {
  return (
    <>
      <h1>Dummy Page</h1>
      <ModuleLoader
        errorFallback={<DummyErrorFallback />}
        fallback={<DummyFallback />}
      >
        <DummyPage2 />
      </ModuleLoader>
    </>
  );
};
