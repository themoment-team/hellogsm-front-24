import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { oneseoQueryKeys, oneseoUrl, post } from "api/libs";
import { AxiosError } from "axios";
import { PostOneseoType } from "types";

export const usePostMyOneseo = (options: UseMutationOptions<unknown, AxiosError, PostOneseoType>) =>
  useMutation({
    mutationKey: oneseoQueryKeys.postMyOneseo(),
    mutationFn: (data: PostOneseoType) => post(oneseoUrl.postMyOneseo(), data),
    ...options,
  });
