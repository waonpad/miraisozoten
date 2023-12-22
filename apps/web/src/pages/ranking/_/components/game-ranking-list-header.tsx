import NotchedPaperBurlywood from '@/assets/notched-paper-burlywood.png';

export const InfiniteGameRankingListHeader = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${NotchedPaperBurlywood})`,
      }}
      /**
       * ranktitle is custom css class
       */
      className="ranktitle flex bg-[length:110%_120%] bg-center bg-no-repeat [&>div]:text-center"
    >
      <div>順位</div>
      <div>名前</div>
      <div>タイム</div>
      <div>ミス数</div>
    </div>
  );
};
