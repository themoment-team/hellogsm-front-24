import { useQuery } from '@tanstack/react-query';

import { memberUrl, memberQueryKeys, get } from 'api/libs';
import { MyMemberInfoType } from 'types';
import { minutesToMs } from 'shared/utils';

import type { UseQueryOptions } from '@tanstack/react-query';

export const useGetMyAuthInfo = (
  initialData?: MyMemberInfoType | undefined,
  options?: Omit<UseQueryOptions<MyMemberInfoType | undefined>, 'queryKey'>,
) =>
  useQuery({
    queryKey: memberQueryKeys.getMyAuthInfo(),
    queryFn: () => get<MyMemberInfoType>(memberUrl.getMyAuthInfo()),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
    initialData: initialData,
  });
