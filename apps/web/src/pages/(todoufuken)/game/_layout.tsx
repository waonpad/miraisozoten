import { Outlet } from 'react-router-dom';

import { GameProvider } from '../_/providers/game-provider';

export default function Layout() {
  return (
    <GameProvider>
      <Outlet />
    </GameProvider>
  );
}
