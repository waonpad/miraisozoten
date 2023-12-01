import { render, screen, fireEvent } from '@/test/utils';

import { PrefectureOverviewDialog } from './prefecture-overview-dialog';

describe('PrefectureOverviewDialog', async () => {
  it('都道府県の名前と地域名が正しく表示されてボタンをクリックした際適切なハンドラを呼び出せるかテストする', async () => {
    const mockHandleOpenChange = vi.fn();
    const mockHandleSelect = vi.fn();

    const mockPrefecture = {
      name: '東京都',
      region: { name: '関東' },
    };

    render(
      <PrefectureOverviewDialog
        prefecture={mockPrefecture}
        open={true}
        handleOpenChange={mockHandleOpenChange}
        handleSelect={mockHandleSelect}
      />
    );

    // 都道府県の名前と地域名が正しく表示されていることを確認
    expect(screen.getByText('東京都')).toBeInTheDocument();
    expect(screen.getByText('関東')).toBeInTheDocument();

    // 「この都道府県にする」ボタンがクリックされたときに適切なハンドラが呼び出されることを確認
    fireEvent.click(screen.getByText('この都道府県にする'));
    expect(mockHandleSelect).toHaveBeenCalledWith(mockPrefecture);
    expect(mockHandleOpenChange).toHaveBeenCalledWith(false);
  });
});
