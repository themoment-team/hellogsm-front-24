import { useQuery } from "@tanstack/react-query";

import { get, exampleQueryKeys, exampleUrl } from "api/libs";
// import { minutesToMs } from "@/utils";

interface ExampleDataType {
  id: string;
  data: string;
}

import type { UseQueryOptions } from "@tanstack/react-query";

export const useGetMyMenteeInfo = (
  options?: Omit<UseQueryOptions<ExampleDataType>, "queryKey">
) =>
  useQuery({
    queryKey: exampleQueryKeys.getExampleData(),
    queryFn: () => get<ExampleDataType>(exampleUrl.getExampleData()),
    // staleTime: minutesToMs(5),
    // gcTime: minutesToMs(5),
    ...options,
  });
