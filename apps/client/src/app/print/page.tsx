import { redirect } from 'next/navigation';

import { getMyOneseo } from 'client/app/apis/oneseo/getMyOneseo';
import { PrintPage } from 'client/pageContainer';

export default async function Home() {
  const data = await getMyOneseo();
  redirect('/');
  //TODO 임시 redirect
  return <PrintPage initialData={data} />;
}
