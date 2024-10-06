// import { redirect } from 'next/navigation';

import { getDate } from 'api';

import { SignUpPage } from 'client/pageContainer';

export default async function SignUp() {
  const dateList = await getDate();

  const currentTime = new Date().getTime();
  const isPastAnnouncement = dateList?.firstResultsAnnouncement
    ? currentTime > new Date(dateList.firstResultsAnnouncement).getTime()
    : false;

  // redirect('/');
  // TODO 임시 redirect
  return <SignUpPage isPastAnnouncement={isPastAnnouncement} />;
}
