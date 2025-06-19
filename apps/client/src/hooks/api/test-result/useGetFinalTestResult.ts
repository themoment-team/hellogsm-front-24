import { useQuery } from '@tanstack/react-query';

import { get, testResultQueryKeys, testResultUrl } from 'api';
import { minutesToMs } from 'shared';
import { CheckResultParams, FinalTestResultType } from 'types';

export const useGetFinalTestResult = ({ name, birth, phoneNumber }: CheckResultParams) =>
  useQuery({
    queryKey: testResultQueryKeys.getFinalTestResult(name, birth, phoneNumber),
    queryFn: () =>
      get<FinalTestResultType>(testResultUrl.getFinalTestResult(name, birth, phoneNumber)),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    enabled: !!name && !!birth && !!phoneNumber,
  });
