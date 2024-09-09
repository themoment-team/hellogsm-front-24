import { redirect } from 'next/navigation';

import { getMyOneseo } from 'client/app/apis';
import { MyPage as MyPageComponent } from 'client/pageContainer';

export default async function MyPage() {
  const data = await getMyOneseo();
  redirect('/');
  //TODO 임시 redirect
  return <MyPageComponent initialData={data} />;
}
