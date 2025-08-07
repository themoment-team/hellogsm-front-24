import { CallbackPage } from 'client/pageContainer';

export default function Callback({ searchParams }: { searchParams: { code: string } }) {
  return <CallbackPage code={searchParams.code} />;
}
