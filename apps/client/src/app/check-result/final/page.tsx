import { getDate } from 'api';

import { CheckFinalResultPage } from 'client/pageContainer';

export default async function CheckFinalResult() {
  const dateList = await getDate();

  const currentTime = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  ).getTime();

  const isCheckFinalResult =
    dateList?.finalResultsAnnouncement &&
    new Date(dateList.finalResultsAnnouncement).getTime() <= currentTime
      ? true
      : false;

  return <CheckFinalResultPage isCheckFinalResult={isCheckFinalResult} />;
}
