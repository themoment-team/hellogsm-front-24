import { redirect } from 'next/navigation';

import { getMyMemberInfo, getMyOneseo } from 'client/app/apis';
import { RegisterStepsPage } from 'client/pageContainer';

interface RegisterProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function Register({ searchParams }: RegisterProps) {
  const step = searchParams?.step;

  const [data, info] = await Promise.all([getMyOneseo(), getMyMemberInfo('/')]);

  if (info === undefined || (data !== undefined && data.step === null)) redirect('/');

  if (!step) redirect('/register?step=1');

  return <RegisterStepsPage data={data} info={info} param={step} />;
}
