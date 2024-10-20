import { redirect } from 'next/navigation';

import { MainPage } from 'client/pageContainer';

import {
  getMyAuthInfo,
  getMyFirstTestResult,
  getMyMemberInfo,
  getMySecondTestResult,
} from './apis';

export default async function Home() {
  const [memberInfo, authInfo, firstResultInfo, secondResultInfo] = await Promise.all([
    getMyMemberInfo('/'),
    getMyAuthInfo('/'),
    getMyFirstTestResult(),
    getMySecondTestResult(),
  ]);

  if (authInfo?.authReferrerType && !memberInfo?.name) {
    redirect('/signup');
  }

  const resultInfo = {
    firstTestPassYn: firstResultInfo?.firstTestPassYn ?? null,
    secondTestPassYn: secondResultInfo?.secondTestPassYn ?? null,
    decidedMajor: secondResultInfo?.decidedMajor ?? null,
  };

  console.log(resultInfo);

  return <MainPage memberInfo={memberInfo} resultInfo={resultInfo} />;
}
