import { useEffect } from 'react';

import { Logo } from '@/components/elements/logo';
import { SoundToggleIconButton } from '@/components/elements/sound-toggle-icon-button';
import { Head } from '@/components/head';
import { useFadeTransition } from '@/components/transitions/fade-transition/use-fade-transition';

import { AttributionList } from './_/components/attribution-list';
import { SoundAttributions } from './_/constants/sound-attributions';

import './_/css/attribution.css'; // css読み込み

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

      <div className="p-2 lg:p-4">
        <div className="pagetitle">
          <Logo />
          <p>都道府県データの引用元</p>
        </div>

        <div className="attrtable">
          <AttributionList />
        </div>

        <div className="ml-[2.5%] mt-6 text-3xl">サウンド</div>

        <div className="attrtable">
          <ul>
            {SoundAttributions.map((soundAttribution, index) => (
              <li key={index}>
                <a
                  href={soundAttribution.sourceSiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {soundAttribution.sourceSiteName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <SoundToggleIconButton className="absolute right-2 top-2" />
    </>
  );
}
