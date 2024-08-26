import { getMyOneseo } from 'client/app/apis';
import { RegisterStep4Page, RegisterStepsPage } from 'client/pageContainer';

interface RegisterProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function Register({ searchParams }: RegisterProps) {
  const step = searchParams?.step;
  const data = await getMyOneseo();

  switch (step) {
    case '1':
      return <RegisterStepsPage data={data} param="1" />;

    case '2':
      return <RegisterStepsPage data={data} param="2" />;

    case '3':
      return <RegisterStepsPage data={data} param="3" />;

    case '4':
      return <RegisterStep4Page data={data} />;

    default:
      return <div></div>;
  }
}
