import { getDate } from '@repo/api/apis';
import { getKoreanDate, isTimeAfter } from '@repo/utils';

import { MainPage } from '@/pageContainer';
import { SearchParamsRecord, parseOneseoListQuery } from '@/pageContainer/MainPage/oneseoListQuery';

import { getOneseoList } from './apis';

interface HomeProps {
  searchParams: Promise<SearchParamsRecord>;
}

export default async function Home({ searchParams }: HomeProps) {
  // 클라이언트가 같은 조건의 쿼리 키로 이어받을 수 있도록 URL과 같은 조건으로 초기 목록을 받습니다.
  const initialQuery = parseOneseoListQuery(await searchParams);

  const [data, dateList] = await Promise.all([
    getOneseoList({ redirectUrl: '/signin', query: initialQuery }),
    getDate(),
  ]);

  const currentTime = getKoreanDate();

  const isAfterFirstResults =
    !!dateList?.firstResultsAnnouncement &&
    isTimeAfter({
      baseTime: new Date(dateList.firstResultsAnnouncement),
      compareTime: currentTime,
    });

  const isAfterSecondResults =
    !!dateList?.finalResultsAnnouncement &&
    isTimeAfter({
      baseTime: new Date(dateList.finalResultsAnnouncement),
      compareTime: currentTime,
    });

  const is역량검사처리기간 =
    !!dateList?.competencyEvaluation &&
    isTimeAfter({
      baseTime: new Date(dateList.competencyEvaluation),
      compareTime: currentTime,
    });

  const is심층면접처리기간 =
    !!dateList?.inDepthInterview &&
    isTimeAfter({
      baseTime: new Date(dateList.inDepthInterview),
      compareTime: currentTime,
    });

  return (
    <MainPage
      initialData={data}
      initialQuery={initialQuery}
      isAfterFirstResults={isAfterFirstResults}
      isAfterSecondResults={isAfterSecondResults}
      is역량검사처리기간={is역량검사처리기간}
      is심층면접처리기간={is심층면접처리기간}
    />
  );
}
