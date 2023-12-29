import { AttributionList } from '@/pages/attribution/_/components/attribution-list';
import { render, screen } from '@/test/utils';

test('renders AttributionList', async () => {
  await render(<AttributionList />);

  const listItems = await screen.findAllByRole('listitem');

  listItems.forEach((item) => {
    expect(item).toBeInTheDocument();
  });

  // レンダリングされたhtmlを確認する場合
  // screen.debug();
});
