import { CalculatePage } from 'client/pageContainer';
import { getIsServerHealthy } from 'client/utils';

export default async function Calculate() {
  const isServerHealthy = await getIsServerHealthy();

  return <CalculatePage isServerHealthy={isServerHealthy} />;
}
