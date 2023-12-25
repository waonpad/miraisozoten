import { fireEvent, render, screen } from '@/test/utils';

import { ConfirmGiveUpDialog } from './confirm-give-up-dialog';

describe('ConfirmGiveUpDialog', () => {
  it('ConfirmGiveUpDialog_ギブアップするときにダイアログで操作したものをpropsに渡してそれに見合った処理をする', async () => {
    const handleOpenChange = vi.fn();
    const handleGiveUp = vi.fn();
    await render(
      <ConfirmGiveUpDialog
        open={true}
        handleOpenChange={handleOpenChange}
        handleGiveUp={handleGiveUp}
      />
    );

    const dialog = screen.getByText('ギブアップしますか？');
    expect(dialog).toBeInTheDocument();

    const giveUpButton = screen.getByText('ギブアップ');
    fireEvent.click(giveUpButton);
    expect(handleGiveUp).toHaveBeenCalled();

    const cancelButton = screen.getByText('キャンセル');
    fireEvent.click(cancelButton);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});
