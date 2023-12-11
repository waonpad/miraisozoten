import { useEffect } from 'react';

import { Head } from '@/components/head';
import { useFadeTransition } from '@/components/transitions/fade-transition/use-fade-transition';

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
      <Head title="ゲーム説明" description="闘道賦県ゲームの説明ページです。" />
      <div>explain</div>
    </>
  );
}
