import { getMyOneseo } from 'client/app/apis';
import { MyPage as MyPageComponent } from 'client/pageContainer';

export default async function MyPage() {
  const data = await getMyOneseo();
  return <MyPageComponent data={data} />;
}
