import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';

import { minutesToMs } from 'shared';

import { get, oneseoQueryKeys, oneseoUrl } from 'api/libs';

interface ExampleDataType {
  id: string;
  data: string;
}

export const useGetSearchedOneseoList = (
  page: number,
  size: number,
  testResultTag: string,
  screeningTag?: string,
  isSubmitted?: string,
  keyword?: string,
  options?: Omit<UseQueryOptions<ExampleDataType>, 'queryKey'>,
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
      get<ExampleDataType>(
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
