import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { PostOneseoType } from 'types';

import { oneseoQueryKeys, oneseoUrl, put } from 'api/libs';

export const usePutOneseo = (
  id: number,
  options: UseMutationOptions<unknown, AxiosError, PostOneseoType>,
) =>
  useMutation({
    mutationKey: oneseoQueryKeys.putOneseoById(id),
    mutationFn: (data: PostOneseoType) => put(oneseoUrl.putOneseoById(id), data),
    ...options,
  });
