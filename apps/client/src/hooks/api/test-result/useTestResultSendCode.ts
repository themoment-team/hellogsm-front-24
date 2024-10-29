import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptions } from '@tanstack/react-query';

import type { AxiosError } from 'axios';

import { post, testResultUrl } from 'api/libs';

import type { SendCodeType } from 'types';

interface ReturnDataType {
  status: string;
  code: number;
  message: string;
}

export const useTestResultSendCode = (
  options?: UseMutationOptions<ReturnDataType, AxiosError, SendCodeType>,
) =>
  useMutation({
    mutationFn: (phoneNumber: SendCodeType) =>
      post<ReturnDataType>(testResultUrl.postSendCode(), phoneNumber),
    ...options,
  });
