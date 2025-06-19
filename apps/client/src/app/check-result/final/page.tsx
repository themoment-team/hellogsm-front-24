import { getDate } from 'api';
import { getKoreanDate, isTimeAfter } from 'shared';

import { CheckFinalResultPage } from 'client/pageContainer';

export default async function CheckFinalResult() {
  const dateList = await getDate();

  const currentTime = getKoreanDate();

  const isCheckFinalResult =
    !!dateList?.finalResultsAnnouncement &&
    isTimeAfter({
      baseTime: new Date(dateList.finalResultsAnnouncement),
      compareTime: currentTime,
    });

  return <CheckFinalResultPage isCheckFinalResult={isCheckFinalResult} />;
}
