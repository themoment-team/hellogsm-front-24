import { getDate } from 'api';
import { getKoreanDate, isTimeAfter } from 'shared';

import { CheckFirstResultPage } from 'client/pageContainer';

export default async function CheckFirstResult() {
  const dateList = await getDate();

  const currentTime = getKoreanDate();

  const isCheckFirstResult =
    !!dateList?.firstResultsAnnouncement &&
    isTimeAfter({
      baseTime: new Date(dateList.firstResultsAnnouncement),
      compareTime: currentTime,
    });

  return <CheckFirstResultPage isCheckFirstResult={isCheckFirstResult} />;
}
