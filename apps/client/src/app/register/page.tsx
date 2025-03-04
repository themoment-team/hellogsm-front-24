import { getDate } from 'api';
import { redirect } from 'next/navigation';
import { StepEnum } from 'types';

import { getMyMemberInfo, getMyOneseo } from 'client/app/apis';
import { RegisterStepsPage } from 'client/pageContainer';

interface RegisterProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function Register({ searchParams }: RegisterProps) {
  const step = searchParams?.step;

  const [data, info, dateList] = await Promise.all([
    getMyOneseo(),
    getMyMemberInfo('/'),
    getDate(),
  ]);

  const currentTime = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  ).getTime();

  const isOneseoWrite =
    dateList?.oneseoSubmissionStart && dateList?.oneseoSubmissionEnd
      ? new Date(dateList.oneseoSubmissionStart).getTime() <= currentTime &&
        currentTime < new Date(dateList.oneseoSubmissionEnd).getTime()
      : false;

  if (!info || (data && !data.step) || !isOneseoWrite) redirect('/');

  if (!step || !['1', '2', '3', '4'].includes(step)) redirect('/register?step=1');

  return <RegisterStepsPage data={data} info={info} step={step as StepEnum} />;
}
