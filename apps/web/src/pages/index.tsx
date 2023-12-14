import JapanBlack from '@/assets/japan-black.png';
import NotchedPaperBurlywood from '@/assets/notched-paper-burlywood.png';
import TItleCatchVertical from '@/assets/title-catch-vertical.png';
import TitleNameCatchHorizontal from '@/assets/title-name-catch-horizontal.png';
import TitleNameVertical from '@/assets/title-name-vertical.png';
import { ImageBgButton } from '@/components/elements/image-bg-button';
import { Head } from '@/components/head';
import { useFadeTransition } from '@/components/transitions/fade-transition/use-fade-transition';
import { useSound } from '@/lib/use-sound/use-sound';
import { Link, useNavigate } from '@/router';

export default function Page() {
  const { playPageMove } = useSound();

  const fadeTransition = useFadeTransition();

  const navigate = useNavigate();

  const handleClickNavigateToMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    fadeTransition.closeFade();

    playPageMove();

    setTimeout(() => {
      navigate('/menu');
    }, fadeTransition.duration);
  };

  return (
    <>
      <Head description="新感覚！ 都道府県統計バトル！" />

      {/* lg未満 */}
      {/* 縦並び */}
      <div className="flex h-screen w-screen flex-col items-center justify-center lg:hidden">
        <div className="grid h-full w-full grid-rows-6 gap-2 p-4">
          {/* キャッチコピーとタイトル */}
          <div className="relative row-span-3 flex h-auto w-full items-center justify-center sm:h-full sm:w-auto">
            <img
              src={TitleNameCatchHorizontal}
              alt="キャッチコピーとタイトル"
              className="absolute aspect-[3928/2610] h-auto w-full sm:h-full sm:w-auto"
            />
          </div>
          {/* 地図 */}
          <div className="row-span-3 h-full">
            <div className="relative flex h-[calc(100%-44px)] items-center justify-center">
              <img src={JapanBlack} alt="日本地図" className="absolute aspect-[796/900] h-full" />
            </div>
            <div className="flex justify-center">
              <ImageBgButton
                onClick={handleClickNavigateToMenu}
                imagePath={NotchedPaperBurlywood}
                className="px-20 py-2 text-xl"
              >
                <Link to="/menu">開始</Link>
              </ImageBgButton>
            </div>
          </div>
        </div>
      </div>

      {/* lg以上 */}
      <div className="hidden h-screen w-screen items-center justify-center lg:flex">
        <div className="grid h-full w-full grid-cols-12 gap-3 p-6">
          {/* キャッチコピー, 地図, タイトルを横並びにする */}
          <div className="relative col-span-3 flex h-full items-end justify-center pb-12">
            <img
              src={TItleCatchVertical}
              alt="キャッチコピー"
              className="absolute aspect-[2063/4509] h-3/4"
            />
          </div>
          <div className="col-span-6 h-full">
            <div className="relative flex h-[calc(100%-72px)] items-center justify-center">
              <img src={JapanBlack} alt="日本地図" className="absolute aspect-[796/900] h-full" />
            </div>
            <div className="flex justify-center">
              <ImageBgButton
                onClick={handleClickNavigateToMenu}
                imagePath={NotchedPaperBurlywood}
                className="px-20 py-5 text-2xl"
              >
                <Link to="/menu">開始</Link>
              </ImageBgButton>
            </div>
          </div>
          <div className="relative col-span-3 flex h-full justify-center">
            <img
              src={TitleNameVertical}
              alt="タイトル"
              className="absolute aspect-[1280/4680] h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
