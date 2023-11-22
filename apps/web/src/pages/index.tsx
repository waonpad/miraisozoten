import { Button } from 'ui/components/ui/button';

import { Head } from '@/components/head';
import { Link } from '@/router';

export default function Page() {
  return (
    <>
      <Head description="新感覚！ 都道府県統計バトル！" />

      <div>タイトル</div>
      <Button asChild>
        <Link to="/menu">開始</Link>
      </Button>
      <div>タイトル画像を配置</div>
      <div>キャッチコピー</div>
    </>
  );
}
