import { redirect } from 'next/navigation';

import { getMyOneseo } from 'client/app/apis';
import { RegisterStepsPage } from 'client/pageContainer';

interface RegisterProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function Register({ searchParams }: RegisterProps) {
  const step = searchParams?.step;
  const data = await getMyOneseo();

  if (!step) redirect('/register?step=1');

  return <RegisterStepsPage data={data} param={step} />;
}
