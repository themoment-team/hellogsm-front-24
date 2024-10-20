import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { operationQueryKeys, opetaionUrl, post } from 'api/libs';

export const usePostFirstResult = (options: UseMutationOptions<unknown, AxiosError>) =>
  useMutation({
    mutationKey: operationQueryKeys.postFirstResult(),
    mutationFn: () => post(opetaionUrl.postFirstResult()),
    ...options,
  });
