import { GetMyOneseoType } from 'types';

import { EditStep4Page } from 'admin/pageContainer/Edit';

interface EditProps {
  params: { memberId: string };
  searchParams?: { [key: string]: string | undefined };
}

export default async function Edit({ params: { memberId }, searchParams }: EditProps) {
  // const data = await getOneseoById(memberId);
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
      return <EditStep4Page data={data} memberId={Number(memberId)} />;

    default:
      return <div></div>;
  }
}
