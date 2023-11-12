import { Outlet } from 'react-router-dom';

import { MainLayout } from '@/components/layout/main';
import { AppProvider } from '@/providers/app-provider';

import { Modals } from '../routes';

export default function App() {
  return (
    <AppProvider>
      <MainLayout>
        <Outlet />
      </MainLayout>
      <Modals />
    </AppProvider>
  );
}
