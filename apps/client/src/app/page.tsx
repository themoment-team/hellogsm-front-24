import { redirect } from 'next/navigation';

import { MainPage } from 'client/pageContainer';

import { getMyAuthInfo, getMyMemberInfo, getMyTestResult } from './apis';

export default async function Home() {
  const [memberInfo, authInfo, resultInfo] = await Promise.all([
    getMyMemberInfo('/'),
    getMyAuthInfo('/'),
    getMyTestResult(),
  ]);

  if (authInfo?.authReferrerType && !memberInfo?.name) {
    redirect('/signup');
  }

  return <MainPage resultInfo={resultInfo} memberInfo={memberInfo} />;
}
