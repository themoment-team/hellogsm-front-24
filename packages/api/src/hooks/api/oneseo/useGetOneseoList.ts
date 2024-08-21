import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';

import { OneseoListType } from 'types';

import { minutesToMs } from 'shared/utils';

import { get, oneseoQueryKeys, oneseoUrl } from 'api/libs';

export const useGetOneseoList = (
  page: number,
  size: number,
  testResultTag: string,
  screeningTag?: string,
  isSubmitted?: string,
  keyword?: string,
  options?: Omit<UseQueryOptions<OneseoListType>, 'queryKey'>,
) =>
  useQuery({
    queryKey: oneseoQueryKeys.getSearchedOneseoList(
      page,
      size,
      testResultTag,
      screeningTag,
      isSubmitted,
      keyword,
    ),
    queryFn: () =>
      get<OneseoListType>(
        oneseoUrl.getSearchedOneseoList(
          page,
          size,
          testResultTag,
          screeningTag,
          isSubmitted,
          keyword,
        ),
      ),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
  });
