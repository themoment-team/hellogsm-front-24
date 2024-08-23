import { GetMyOneseoType } from 'types';

import { EditStep4Page } from 'admin/pageContainer/Edit';

interface EditProps {
  params: { userId: string };
  searchParams?: { [key: string]: string | undefined };
}

export default async function Edit({ params: { userId }, searchParams }: EditProps) {
  // const data = await getOneseoById(userId);
  const data = {} as GetMyOneseoType;
  const step = searchParams?.step;

  switch (step) {
    case '1':
      return <div></div>;

    case '2':
      return <div></div>;

    case '3':
      return <div></div>;

    case '4':
      return <EditStep4Page data={data} userId={Number(userId)} />;

    default:
      return <div></div>;
  }
}
