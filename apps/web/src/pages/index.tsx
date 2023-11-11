import { Button } from 'ui/components/ui/button';

import { Link } from '@/router';

export default function Page() {
  return (
    <>
      <div>タイトル</div>
      <Button asChild>
        <Link to="/menu">開始</Link>
      </Button>
      <div>タイトル画像を配置</div>
      <div>キャッチコピー</div>
    </>
  );
}
