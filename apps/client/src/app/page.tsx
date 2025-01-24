import { redirect } from 'next/navigation';

import { MainPage } from 'client/pageContainer';
import { getIsServerHealthy } from 'client/utils';

import {
  getMyAuthInfo,
  getMyFirstTestResult,
  getMyMemberInfo,
  getMySecondTestResult,
} from './apis';

export default async function Home() {
  const [memberInfo, authInfo, firstResultInfo, secondResultInfo, isServerHealthy] =
    await Promise.all([
      getMyMemberInfo('/'),
      getMyAuthInfo('/'),
      getMyFirstTestResult(),
      getMySecondTestResult(),
      getIsServerHealthy(),
    ]);

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
