import { Link } from 'react-router-dom';

import { PrefectureStatsMetadataResponse } from 'schema/dist/prefecture/stats/metadata';

export const AttributionListItem = ({
  metadata,
}: {
  metadata: PrefectureStatsMetadataResponse;
}) => {
  return (
    <div>
      <div>{metadata.label}</div>
      <Link to={metadata.sourceUrl} target="_blank">
        {metadata.sourceUrlTitle}
      </Link>
      <div>{metadata.sourceSiteName}</div>
      <div>データ取得日 {metadata.retrievedAt.toString()}</div>
    </div>
  );
};
