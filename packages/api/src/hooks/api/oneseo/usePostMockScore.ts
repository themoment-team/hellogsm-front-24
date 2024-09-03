import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import {
  GEDAchievementType,
  GraduationType,
  MiddleSchoolAchievementType,
  MockScoreType,
} from 'types';

import { oneseoQueryKeys, oneseoUrl, post } from 'api/libs';

export const usePostMockScore = (
  type: GraduationType,
  options: UseMutationOptions<
    MockScoreType,
    AxiosError,
    MiddleSchoolAchievementType | GEDAchievementType
  >,
) =>
  useMutation({
    mutationKey: oneseoQueryKeys.postMockScore(type),
    mutationFn: (data: MiddleSchoolAchievementType | GEDAchievementType) =>
      post<MockScoreType>(oneseoUrl.postMockScore(type), data),
    ...options,
  });
