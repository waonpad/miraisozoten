import { PrefectureStatsMetadataResponse } from 'schema/dist/prefecture/stats/metadata';

export const AttributionListItem = ({
  metadata,
}: {
  metadata: PrefectureStatsMetadataResponse;
}) => {
  return (
    <div>
      <div>{metadata.label}</div>
      <a href={metadata.sourceUrl} target="_blank">
        {metadata.sourceUrlTitle}
      </a>
      <div>{metadata.sourceSiteName}</div>
      <div>データ取得日 {metadata.retrievedAt.toString()}</div>
    </div>
  );
};
