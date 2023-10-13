import * as React from 'react';

import { AppBar } from '../app-bar';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
};
