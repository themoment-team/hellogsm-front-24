import { getMyOneseo } from 'client/app/apis/oneseo/getMyOneseo';
import { PrintPage } from 'client/pageContainer';

export default async function Home() {
  const data = await getMyOneseo();

  return <PrintPage initialData={data} />;
}
