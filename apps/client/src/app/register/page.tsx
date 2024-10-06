import { getDate } from 'api';
import { redirect } from 'next/navigation';

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

  const currentTime = new Date().getTime();
  const isOneseoWrite =
    dateList?.oneseoSubmissionStart && dateList?.oneseoSubmissionEnd
      ? new Date(dateList.oneseoSubmissionStart).getTime() <= currentTime &&
        currentTime < new Date(dateList.oneseoSubmissionEnd).getTime()
      : false;

  if (info === undefined || (data && !data.step) || !isOneseoWrite) redirect('/');

  if (!step) redirect('/register?step=1');

  return <RegisterStepsPage data={data} info={info} param={step} />;
}
