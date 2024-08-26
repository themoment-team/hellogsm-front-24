import { getMyOneseo } from 'client/app/apis';
import { RegisterStep4Page, StepsPage } from 'client/pageContainer';

interface RegisterProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function Register({ searchParams }: RegisterProps) {
  const step = searchParams?.step;
  const data = await getMyOneseo();

  switch (step) {
    case '1':
      return <StepsPage param="1" />;

    case '2':
      return <StepsPage param="2" />;

    case '3':
      return <StepsPage param="3" />;

    case '4':
      return <RegisterStep4Page data={data} />;

    default:
      return <div></div>;
  }
}
