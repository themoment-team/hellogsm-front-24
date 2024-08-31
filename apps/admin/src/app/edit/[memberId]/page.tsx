import { redirect } from 'next/navigation';
import { StepsContainer } from 'shared';

import { getOneseoByMemberId } from 'admin/app/apis/oneseo/getOneseoById';

const LAST_STEP = 4;

interface EditProps {
  params: { memberId: string };
  searchParams?: { [key: string]: string | undefined };
}

export default async function Edit({ params: { memberId }, searchParams }: EditProps) {
  const step = searchParams?.step;
  const id = Number(memberId);

  // const { data: memberInfo } = useGetMyMemberInfo();
  if (!step || (step && Number(step) > LAST_STEP)) return redirect(`/edit/${memberId}?step=1`);

  const data = await getOneseoByMemberId(id);

  return <StepsContainer data={data} type="admin" param={step} memberId={Number(memberId)} />;
}
