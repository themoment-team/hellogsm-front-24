import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { MainPage } from 'client/pageContainer';
import { getIsServerHealthy } from 'client/utils';

import {
  getMyAuthInfo,
  getMyFirstTestResult,
  getMyMemberInfo,
  getMySecondTestResult,
} from './apis';

export default async function Home({ searchParams }: { searchParams?: { isAdmin?: string } }) {
  const [memberInfo, authInfo, firstResultInfo, secondResultInfo, isServerHealthy] =
    await Promise.all([
      getMyMemberInfo('/'),
      getMyAuthInfo('/'),
      getMyFirstTestResult(),
      getMySecondTestResult(),
      getIsServerHealthy(),
    ]);

  const isAdminRequested = searchParams?.isAdmin === 'true';
  const isAdminRole = authInfo?.role === 'ADMIN' || authInfo?.role === 'ROOT';

  if (isAdminRequested && isAdminRole) {
    const host = headers().get('host') ?? '';
    const isStage = host.includes('stage');
    const adminUrl = isStage ? 'https://admin.stage.hellogsm.kr' : 'https://admin.hellogsm.kr';
    redirect(adminUrl);
  }

  if (authInfo?.authReferrerType && !memberInfo?.name) {
    redirect('/signup');
  }

  const resultInfo = {
    firstTestPassYn: firstResultInfo?.firstTestPassYn ?? null,
    secondTestPassYn: secondResultInfo?.secondTestPassYn ?? null,
    decidedMajor: secondResultInfo?.decidedMajor ?? null,
  };

  return (
    <MainPage memberInfo={memberInfo} resultInfo={resultInfo} isServerHealthy={isServerHealthy} />
  );
}
