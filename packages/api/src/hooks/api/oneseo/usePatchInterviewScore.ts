import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { oneseoQueryKeys, oneseoUrl, patch } from 'api/libs';

export const usePatchInterviewScore = (
  memberId: number,
  options?: UseMutationOptions<unknown, AxiosError, { score: number }>,
) =>
  useMutation({
    mutationKey: oneseoQueryKeys.patchInterviewScore(memberId),
    mutationFn: (score) => patch(oneseoUrl.patchInterviewScore(memberId), score),
    ...options,
  });
