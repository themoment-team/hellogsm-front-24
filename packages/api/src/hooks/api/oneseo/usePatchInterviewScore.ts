import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { oneseoQueryKeys, oneseoUrl, patch } from 'api/libs';

export const usePatchInterviewScore = (
  memberId: number,
  options: UseMutationOptions<unknown, AxiosError, { memberId: number }>,
) =>
  useMutation({
    mutationKey: oneseoQueryKeys.patchInterviewScore(memberId),
    mutationFn: () => patch(oneseoUrl.patchInterviewScore(memberId)),
    ...options,
  });
