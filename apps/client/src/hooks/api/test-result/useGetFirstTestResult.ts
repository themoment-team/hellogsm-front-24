import { useQuery } from '@tanstack/react-query';

import { getFirstTestResult } from 'api';

interface GetFirstTestResultParams {
  name: string;
  birth: string;
  phoneNumber: string;
}

export const useGetFirstTestResult = (params: GetFirstTestResultParams | undefined) =>
  useQuery({
    queryKey: ['firstTestResult', params],
    queryFn: () => {
      if (!params) return Promise.resolve(undefined);
      return getFirstTestResult(params.name, params.birth, params.phoneNumber);
    },
    enabled: !!params,
  });
