import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';

import { MyTestResultType } from 'types';

import { minutesToMs } from 'shared/utils';

import { get, memberQueryKeys, memberUrl } from 'api/libs';

export const useGetMyTestResultInfo = (
  options?: Omit<UseQueryOptions<MyTestResultType>, 'queryKey'>,
) =>
  useQuery({
    queryKey: memberQueryKeys.getMyTestResultInfo(),
    queryFn: () => get<MyTestResultType>(memberUrl.getMyTestResult()),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
  });
