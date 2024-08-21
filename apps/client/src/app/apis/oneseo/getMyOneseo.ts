import { GetMyOneseoType } from 'types';

import { oneseoUrl } from 'api/libs';

// eslint-disable-next-line @rushstack/no-new-null
export const getMyOneseo = async (): Promise<GetMyOneseoType | null> => {
  const response = await fetch(
    new URL(`/api${oneseoUrl.getMyOneseo()}}`, process.env.NEXT_PUBLIC_API_BASE_URL),
    {
      method: 'GET',
    },
  );
  const myOneseo: GetMyOneseoType = await response.json();

  if (response.status === 404) return null;

  return myOneseo;
};
