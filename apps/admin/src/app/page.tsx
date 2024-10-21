import { getDate } from 'api';

import { getOneseoList } from 'admin/app/apis/oneseo/getOneseoList';
import { MainPage } from 'admin/pageContainer';

export default async function Home() {
  const [data, dateList] = await Promise.all([
    getOneseoList({ redirectUrl: '/signin' }),
    getDate(),
  ]);

  const today = new Date();
  const firstResultsAnnouncement = dateList?.firstResultsAnnouncement
    ? new Date(dateList.firstResultsAnnouncement)
    : new Date('2024-10-21T09:59:59');
  const isBeforeFirstResults = today < firstResultsAnnouncement;

  const secondResultsAnnouncement = dateList?.finalResultsAnnouncement
    ? new Date(dateList.finalResultsAnnouncement)
    : new Date('2024-10-30T09:59:59');

  const isBeforeSecondResults = today < secondResultsAnnouncement;

  return (
    <MainPage
      initialData={data}
      isBeforeFirstResults={isBeforeFirstResults}
      isBeforeSecondResults={isBeforeSecondResults}
    />
  );
}
