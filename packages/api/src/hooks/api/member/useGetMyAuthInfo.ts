import { useQuery } from '@tanstack/react-query';

import { memberUrl, memberQueryKeys, get } from 'api/libs';
import { MyAuthInfoType } from 'types';
import { minutesToMs } from 'shared/utils';

import type { UseQueryOptions } from '@tanstack/react-query';

export const useGetMyAuthInfo = (
  initialData?: MyAuthInfoType | undefined,
  options?: Omit<UseQueryOptions<MyAuthInfoType | undefined>, 'queryKey'>,
) =>
  useQuery({
    queryKey: memberQueryKeys.getMyAuthInfo(),
    queryFn: () => get<MyAuthInfoType>(memberUrl.getMyAuthInfo()),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
    initialData: initialData,
  });
