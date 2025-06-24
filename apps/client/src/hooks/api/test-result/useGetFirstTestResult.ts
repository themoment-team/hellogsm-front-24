import { useQuery } from '@tanstack/react-query';

import { get, testResultQueryKeys, testResultUrl } from 'api';
import { minutesToMs } from 'shared';
import { CheckResultParams, FirstTestResultType } from 'types';

export const useGetFirstTestResult = ({ name, birth, phoneNumber }: CheckResultParams) =>
  useQuery({
    queryKey: testResultQueryKeys.getFirstTestResult(name, birth, phoneNumber),
    queryFn: () =>
      get<FirstTestResultType>(testResultUrl.getFirstTestResult(name, birth, phoneNumber)),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    enabled: !!name && !!birth && !!phoneNumber,
  });
