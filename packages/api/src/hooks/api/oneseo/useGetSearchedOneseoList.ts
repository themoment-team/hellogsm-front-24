import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';

import { SearchedOneseoListType } from 'types';

import { minutesToMs } from 'shared/utils';

import { get, oneseoQueryKeys, oneseoUrl } from 'api/libs';

export const useGetSearchedOneseoList = (
  page: number,
  size: number,
  testResultTag: string,
  screeningTag?: string,
  isSubmitted?: string,
  keyword?: string,
  options?: Omit<UseQueryOptions<SearchedOneseoListType>, 'queryKey'>,
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
      get<SearchedOneseoListType>(
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
