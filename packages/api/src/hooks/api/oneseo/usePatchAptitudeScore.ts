import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { oneseoQueryKeys, oneseoUrl, patch } from 'api/libs';

export const usePatchAptitudeScore = (
  memberId: number,
  options?: UseMutationOptions<unknown, AxiosError, { score: number }>,
) =>
  useMutation({
    mutationKey: oneseoQueryKeys.patchAptitudeScore(memberId),
    mutationFn: (score) =>
      patch(oneseoUrl.patchAptitudeScore(memberId), {
        aptitudeEvaluationScore: score,
      }),
    ...options,
  });
