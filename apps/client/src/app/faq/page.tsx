import { FaqPage } from 'client/pageContainer';

export default function Guide({ searchParams }: { searchParams: { openIndex?: string } }) {
  return (
    <FaqPage openIndex={searchParams.openIndex ? Number(searchParams.openIndex) : undefined} />
  );
}
