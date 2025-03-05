import { FaqPage } from 'client/pageContainer';

export default function Faq({ searchParams: {openIndex} }: { searchParams: { openIndex?: string } }) {
  return (
    <FaqPage openIndex={openIndex ? Number(openIndex) : undefined} />
  );
}