import { redirect } from 'next/navigation';

import { MainPage } from 'client/pageContainer';

import { getMyAuthInfo, getMyMemberInfo } from './apis';

export default async function Home() {
  const [memberInfo, authInfo] = await Promise.all([getMyMemberInfo('/'), getMyAuthInfo('/')]);

  if (authInfo?.authReferrerType && !memberInfo?.name) {
    redirect('/signup');
  }

  return <MainPage memberInfo={memberInfo} />;
}
