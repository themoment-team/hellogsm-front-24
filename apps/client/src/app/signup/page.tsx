import { redirect } from 'next/navigation';

import { SignUpPage } from 'client/pageContainer';

export default function SignUp() {
  redirect('/');
  // TODO 임시 redirect
  return <SignUpPage />;
}
