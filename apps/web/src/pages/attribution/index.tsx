import { useEffect } from 'react';

import { Head } from '@/components/head';
import { useFadeTransition } from '@/components/transitions/fade-transition/use-fade-transition';

import { AttributionList } from './_/api/components/attribution-list';

export default function Page() {
  const fadeTransition = useFadeTransition();

  useEffect(() => {
    if (!fadeTransition.isOpen) {
      fadeTransition.openFade();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
