import { getDate } from 'api';

import { getOneseoList } from 'admin/app/apis/oneseo/getOneseoList';
import { MainPage } from 'admin/pageContainer';

export default async function Home() {
  const [data, dateList] = await Promise.all([
    getOneseoList({ redirectUrl: '/signin' }),
    getDate(),
  ]);

  const currentTime = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  ).getTime();

  const firstResultsAnnouncement =
    dateList?.firstResultsAnnouncement &&
    new Date(dateList.firstResultsAnnouncement).getTime() <= currentTime
      ? true
      : false;

  const secondResultsAnnouncement =
    dateList?.finalResultsAnnouncement &&
    new Date(dateList.finalResultsAnnouncement).getTime() <= currentTime
      ? true
      : false;

  return (
    <MainPage
      initialData={data}
      isBeforeFirstResults={firstResultsAnnouncement}
      isBeforeSecondResults={secondResultsAnnouncement}
    />
  );
}
