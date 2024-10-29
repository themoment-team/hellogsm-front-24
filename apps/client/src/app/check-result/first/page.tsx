import { getDate } from 'api';

import { CheckFirstResultPage } from 'client/pageContainer';

export default async function CheckFirstResult() {
  const dateList = await getDate();

  const currentTime = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  ).getTime();

  const isCheckFirstResult =
    dateList?.firstResultsAnnouncement &&
    new Date(dateList.firstResultsAnnouncement).getTime() <= currentTime
      ? true
      : false;

  return <CheckFirstResultPage isCheckFirstResult={isCheckFirstResult} />;
}
