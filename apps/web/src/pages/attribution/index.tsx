import { Head } from '@/components/head';

import { AttributionList } from './_/api/components/attribution-list';

export default function Page() {
  return (
    <>
      <Head
        title="使用データの出典"
        description="このサイトで現在使用しているデータの出典一覧です。"
      />

      <h1>都道府県データの引用元</h1>
      <AttributionList />
    </>
  );
}
