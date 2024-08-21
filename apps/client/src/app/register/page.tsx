import { getMyOneseo } from 'client/app/apis';
import { RegisterStep4Page } from 'client/pageContainer';

interface RegisterProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function Register({ searchParams }: RegisterProps) {
  const step = searchParams?.step;
  const data = await getMyOneseo();

  switch (step) {
    case '1':
      return <div></div>;

    case '2':
      return <div></div>;

    case '3':
      return <div></div>;

    case '4':
      return <RegisterStep4Page data={data} />;

    default:
      return <div></div>;
  }
}
