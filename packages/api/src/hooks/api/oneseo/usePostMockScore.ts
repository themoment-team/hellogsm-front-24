import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { GraduationType, MiddleSchoolAchievementType } from 'types';

import { oneseoQueryKeys, oneseoUrl, post } from 'api/libs';

interface ReturnDataType {
  status: string;
  code: number;
  message: string;
  data: {
    generalSubjectsScore: number | null;
    artsPhysicalSubjectsScore: number | null;
    totalSubjectsScore: number;
    attendanceScore: number;
    volunteerScore: number;
    totalNonSubjectsScore: number;
    totalScore: number;
  };
}

export const usePostMockScore = (
  type: GraduationType,
  options: UseMutationOptions<ReturnDataType, AxiosError, MiddleSchoolAchievementType>,
) =>
  useMutation({
    mutationKey: oneseoQueryKeys.postMockScore(type),
    mutationFn: (data: MiddleSchoolAchievementType) =>
      post<ReturnDataType>(oneseoUrl.postMockScore(type), data),
    ...options,
  });
