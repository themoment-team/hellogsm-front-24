import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptions } from '@tanstack/react-query';

import type { AxiosError } from 'axios';

import { phoneNumberQueryKeys } from 'client/lib';

import { memberUrl, post } from 'api/libs';

import type { CodeRegisterType } from 'types';

interface ReturnDataType {
  status: string;
  code: number;
  message: string;
}

export const usePostNumber = (
  options?: UseMutationOptions<ReturnDataType, AxiosError, CodeRegisterType>,
) =>
  useMutation({
    mutationKey: phoneNumberQueryKeys.postPhoneNumber(),
    mutationFn: (phoneNumber: CodeRegisterType) =>
      post<ReturnDataType>(memberUrl.postNumberRegister(), phoneNumber),
    ...options,
  });
