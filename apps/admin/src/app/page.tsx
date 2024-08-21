import { getOneseoList } from 'admin/app/apis/oneseo/getOneseoList';
import { MainPage } from 'admin/pageContainer';

export default async function Home() {
  const data = await getOneseoList('/signin');

  return <MainPage initialData={data} />;
}
