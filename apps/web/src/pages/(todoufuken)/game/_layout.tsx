import { Outlet } from 'react-router-dom';

import { GameProvider } from '../_/providers/game-provider';
import { GameSettingsProvider } from '../_/providers/game-settings-provider';
import { GameTurnActionProvider } from '../_/providers/game-turn-action-provider';

export default function Layout() {
  return (
    <GameProvider>
      <GameSettingsProvider>
        <GameTurnActionProvider>
          <Outlet />
        </GameTurnActionProvider>
      </GameSettingsProvider>
    </GameProvider>
  );
}
