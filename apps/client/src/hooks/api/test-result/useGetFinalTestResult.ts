import { useQuery } from '@tanstack/react-query';

import { getFinalTestResult } from 'api';

interface GetFinalTestResultParams {
  name: string;
  birth: string;
  phoneNumber: string;
}

export const useGetFinalTestResult = (params: GetFinalTestResultParams | null) =>
  useQuery({
    queryKey: ['finalTestResult', params?.name, params?.birth, params?.phoneNumber],
    queryFn: () => {
      if (!params) return Promise.resolve(undefined);
      return getFinalTestResult(params.name, params.birth, params.phoneNumber);
    },
    enabled: !!params,
  });
