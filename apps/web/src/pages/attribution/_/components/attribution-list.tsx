import { usePrefectureStatsMetadata } from '@/pages/(prefectures)/_/api/get-prefecture-stats-metadata';

import { AttributionListItem } from './attribution-list-item';

export const AttributionList = () => {
  const prefectureStatsMetadataQuery = usePrefectureStatsMetadata();

  return (
    <>
      <ul>
        {(prefectureStatsMetadataQuery.data || []).map((prefectureStatsMetadata, index) => (
          <li key={index}>
            <AttributionListItem metadata={prefectureStatsMetadata} />
          </li>
        ))}
      </ul>
    </>
  );
};
