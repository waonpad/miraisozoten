import { PrefectureStatsMetadataResponse } from 'schema/dist/prefecture/stats/metadata';

import { useSound } from '@/lib/use-sound/use-sound';
import { formatDate } from '@/utils/format';

export const AttributionListItem = ({
  metadata,
}: {
  metadata: PrefectureStatsMetadataResponse;
}) => {
  const { playPageMove } = useSound();

  const handleClickLink = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();

    playPageMove();

    // 別タブで開く
    window.open(metadata.sourceUrl, '_blank');
  };

  return (
    <div>
      <div>{metadata.label}</div>
      <a href={metadata.sourceUrl} onClick={handleClickLink}>
        {metadata.sourceUrlTitle}
      </a>
      <div>{metadata.sourceSiteName}</div>
      <div>データ取得日 {formatDate(metadata.retrievedAt)}</div>
    </div>
  );
};
