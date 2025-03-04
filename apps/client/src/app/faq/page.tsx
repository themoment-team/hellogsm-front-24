import { FaqPage } from 'client/pageContainer';

export default function Faq({ searchParams }: { searchParams: { openIndex?: string } }) {
  return (
    <FaqPage openIndex={searchParams.openIndex ? Number(searchParams.openIndex) : undefined} />
  );
}
