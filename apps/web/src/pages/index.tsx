import JapanBlack from '@/assets/japan-black.png';
import NotchedPaperBurlywood from '@/assets/notched-paper-burlywood.png';
import TItleCatchVertical from '@/assets/title-catch-vertical.svg?react';
import TitleNameVertical from '@/assets/title-name-vertical.svg?react';
import { ImageBgButton } from '@/components/elements/image-bg-button';
import { Head } from '@/components/head';
import { useSound } from '@/lib/use-sound/use-sound';
import { Link } from '@/router';

export default function Page() {
  const { playPageMove } = useSound();

  const handleClickLink = () => {
    playPageMove();
  };

  return (
    <>
      <Head description="新感覚！ 都道府県統計バトル！" />

      {/* とりあえずPC画面想定で書いている */}

      {/* 上下中央にしたいができない、なんで！？！？ */}
      <div className="grid h-screen grid-cols-12 gap-3 p-6">
        {/* キャッチコピー, 地図, タイトルを横並びにする */}
        <div className="relative col-span-3 h-full w-full">
          <TItleCatchVertical className="absolute left-0 top-0 h-full w-full" />
        </div>
        <div className="col-span-6 flex h-full w-full flex-col">
          <div className="flex justify-center">
            <img src={JapanBlack} alt="日本地図" className="w-auto pb-20" />
          </div>
          <div className="flex justify-center">
            <ImageBgButton
              onClick={handleClickLink}
              imagePath={NotchedPaperBurlywood}
              className="px-20 py-2 text-xl lg:py-5 lg:text-2xl"
            >
              <Link to="/menu">開始</Link>
            </ImageBgButton>
          </div>
        </div>
        <div className="relative col-span-3 h-full w-full">
          <TitleNameVertical className="absolute left-0 top-0 h-full w-full" />
        </div>
      </div>
    </>
  );
}
