import { render, fireEvent, screen } from '@/test/utils';

import { GiveUpIconButton } from './give-up-icon-button';

describe('GiveUpIconButton', () => {
  it('GiveUpIconButton_ボタンをクリックするとpropsに渡したonClick関数が実行される', async () => {
    const handleClick = vi.fn();
    await render(<GiveUpIconButton onClick={handleClick} />);

    const button = screen.getByText('ギブアップ');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
