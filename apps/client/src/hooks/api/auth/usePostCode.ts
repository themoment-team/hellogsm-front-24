import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptions } from '@tanstack/react-query';

import type { AxiosError } from 'axios';

import { memberQueryKeys } from 'client/lib';

import { memberUrl, post } from 'api/libs';

interface ReturnDataType {
  status: string;
  code: number;
  message: string;
}

interface CodeType {
  code: string;
}

export const usePostCode = (options?: UseMutationOptions<ReturnDataType, AxiosError, CodeType>) =>
  useMutation({
    mutationKey: memberQueryKeys.postCode(),
    mutationFn: (code: CodeType) => post<ReturnDataType>(memberUrl.postCodeRegister(), code),
    ...options,
  });
