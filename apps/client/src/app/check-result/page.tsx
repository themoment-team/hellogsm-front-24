import { getDate } from 'api';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  getKoreanDate,
  isTimeAfter,
} from 'shared';

import {
  getMyAuthInfo,
  getMyFirstTestResult,
  getMyMemberInfo,
  getMySecondTestResult,
} from 'client/app/apis';
import { LoginDialog } from 'client/components';
import { CheckResultPage } from 'client/pageContainer';
import { getIsServerHealthy } from 'client/utils';

const mainUrl = '/';

export default async function CheckResult() {
  const [memberInfo, authInfo, firstResultInfo, secondResultInfo, isServerHealthy] =
    await Promise.all([
      getMyMemberInfo('/check-result'),
      getMyAuthInfo('/check-result'),
      getMyFirstTestResult(),
      getMySecondTestResult(),
      getIsServerHealthy(),
    ]);

  const resultInfo = {
    firstTestPassYn: firstResultInfo?.firstTestPassYn ?? null,
    secondTestPassYn: secondResultInfo?.secondTestPassYn ?? null,
    decidedMajor: secondResultInfo?.decidedMajor ?? null,
  };

  const dateList = await getDate();

  const currentTime = getKoreanDate();

  const isCheckFirstResult =
    !!dateList?.firstResultsAnnouncement &&
    isTimeAfter({
      baseTime: new Date(dateList.firstResultsAnnouncement),
      compareTime: currentTime,
    });

  const isCheckFinalResult =
    !!dateList?.finalResultsAnnouncement &&
    isTimeAfter({
      baseTime: new Date(dateList.finalResultsAnnouncement),
      compareTime: currentTime,
    });

  return (
    <>
      <CheckResultPage
        memberInfo={memberInfo}
        resultInfo={resultInfo}
        isServerHealthy={isServerHealthy}
        isCheckFirstResult={isCheckFirstResult}
        isCheckFinalResult={isCheckFinalResult}
      />
      <AlertDialog open={!authInfo?.authReferrerType || !memberInfo?.name}>
        <AlertDialogContent className="w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <strong>로그인을 먼저 진행해주세요</strong>
              <br />
              <br />
              학부모/ 담임교사 합격확인 시, 보안상의 문제로 <br />
              본인확인을 위해 회원가입 후 학부모/ 담임교사의 <br />
              본인 로그인이 필요합니다. <br />
              <br /> 빠른 확인을 원하시는 경우, 062-949-6842로 전화주시면 친절히 안내드리겠습니다.{' '}
              <br /> 번거롭게 해드려 죄송합니다.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <LoginDialog />
            <AlertDialogAction>
              <Link href={mainUrl}>다음에</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
