import * as React from 'react';
import { useLocation } from 'react-router-dom';

import InkPaintingBg from '@/assets/ink-painting-bg.jpg';
import TitleBg from '@/assets/title-bg.jpg';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();

  const isTopPage = location.pathname === '/';

  return (
    <>
      <main
        style={{
          ...(isTopPage
            ? {
                backgroundImage: `url(${TitleBg})`,
                // 画像のopacityを擬似的に0.3にする
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backgroundBlendMode: 'lighten',
                // 背景の調整
                backgroundPosition: 'center',
                backgroundSize: '100% auto',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
              }
            : {
                backgroundImage: `url(${InkPaintingBg})`,
                // 画像のopacityを擬似的に0.3にする
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backgroundBlendMode: 'lighten',
                // 背景の調整
                backgroundPosition: 'left bottom',
                backgroundSize: 'auto 112%',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
              }),
          minHeight: '100vh',
        }}
      >
        {children}
      </main>
    </>
  );
};
