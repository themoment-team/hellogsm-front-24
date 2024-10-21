import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { operationQueryKeys, opetaionUrl, post } from 'api/libs';

export const usePostSecondResult = (options: UseMutationOptions<unknown, AxiosError>) =>
  useMutation({
    mutationKey: operationQueryKeys.postSecondResult(),
    mutationFn: () => post(opetaionUrl.postSecondResult()),
    ...options,
  });
