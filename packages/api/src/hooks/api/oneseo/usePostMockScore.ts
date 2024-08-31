import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { GEDAchievementType, GraduationType, MiddleSchoolAchievementType } from 'types';

import { oneseoQueryKeys, oneseoUrl, post } from 'api/libs';

interface ReturnDataType {
  generalSubjectsScore: number;
  artsPhysicalSubjectsScore: number;
  totalSubjectsScore: number;
  attendanceScore: number;
  volunteerScore: number;
  totalNonSubjectsScore: number;
  totalScore: number;
}

export const usePostMockScore = (
  type: GraduationType,
  options: UseMutationOptions<
    ReturnDataType,
    AxiosError,
    MiddleSchoolAchievementType | GEDAchievementType
  >,
) =>
  useMutation({
    mutationKey: oneseoQueryKeys.postMockScore(type),
    mutationFn: (data: MiddleSchoolAchievementType | GEDAchievementType) =>
      post<ReturnDataType>(oneseoUrl.postMockScore(type), data),
    ...options,
  });
