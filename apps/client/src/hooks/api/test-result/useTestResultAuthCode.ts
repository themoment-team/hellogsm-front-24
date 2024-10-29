import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptions } from '@tanstack/react-query';

import type { AxiosError } from 'axios';

import { post, testResultUrl } from 'api/libs';

interface ReturnDataType {
  status: string;
  code: number;
  message: string;
}

interface TestResultAuthCodeType {
  code: string;
}

export const useTestResultAuthCode = (
  options?: UseMutationOptions<ReturnDataType, AxiosError, TestResultAuthCodeType>,
) =>
  useMutation({
    mutationFn: (body: TestResultAuthCodeType) =>
      post<ReturnDataType>(testResultUrl.postAuthCode(), body),
    ...options,
  });
