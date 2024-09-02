import { getMyOneseo } from 'client/app/apis';
import { GuidePage } from 'client/pageContainer';

export default async function Guide() {
  const data = await getMyOneseo();
  return <GuidePage initialData={data} />;
}
