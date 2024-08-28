import { getMyOneseo } from 'client/app/apis';
import { MyPage } from 'client/pageContainer';

export default async function Home() {
  const data = await getMyOneseo();
  return <MyPage data={data} />;
}
