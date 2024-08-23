import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { oneseoQueryKeys, oneseoUrl, patch } from 'api/libs';

export const usePatchAptitudeScore = (
  memberId: number,
  options: UseMutationOptions<unknown, AxiosError, { memberId: number }>,
) =>
  useMutation({
    mutationKey: oneseoQueryKeys.patchAptitudeScore(memberId),
    mutationFn: () => patch(oneseoUrl.patchAptitudeScore(memberId)),
    ...options,
  });
