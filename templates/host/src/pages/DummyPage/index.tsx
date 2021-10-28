import React from 'react';

const DummyPage2 = React.lazy(() => import('app2/DummyPage'));

export const DummyPage = () => {
  return (
    <>
      <div>Dummy Page</div>
      <DummyPage2 />
    </>
  );
};
