import { getDate } from 'api';

import { getMyOneseo } from 'client/app/apis';
import { GuidePage } from 'client/pageContainer';

export default async function Guide() {
  const [data, dateList] = await Promise.all([getMyOneseo(), getDate()]);

  const currentTime = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  ).getTime();

  const isOneseoWrite =
    dateList?.oneseoSubmissionStart && dateList?.oneseoSubmissionEnd
      ? new Date(dateList.oneseoSubmissionStart).getTime() <= currentTime &&
        currentTime < new Date(dateList.oneseoSubmissionEnd).getTime()
      : false;

  return <GuidePage initialData={data} isOneseoWrite={isOneseoWrite} />;
}
