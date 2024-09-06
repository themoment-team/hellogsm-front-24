'use client';

import { useEffect, useState } from 'react';

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { checkIsPassedDate } from 'shared';
import { OneseoListType, OneseoType, ScreeningEnum } from 'types';

import { TextField } from 'admin/components';

import { CheckIcon } from 'shared/assets';
import {
  Table,
  TableBody,
  TableCell,
  Toggle,
  TableRow,
  Badge,
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'shared/components';
import { 심층면접일자, 직무적성일자 } from 'shared/constants';
import { useDebounce } from 'shared/hooks';
import { cn } from 'shared/lib/utils';
import { formatScore } from 'shared/utils';

import {
  usePatchArrivedStatus,
  usePatchAptitudeScore,
  usePatchInterviewScore,
  usePatchAgreeDocStatus,
} from 'api/hooks';

interface ApplicationTRProps extends OneseoType {
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<OneseoListType, Error>>;
}

const ApplicantTR = ({
  refetch,
  aptitudeEvaluationScore,
  firstTestPassYn,
  guardianPhoneNumber,
  interviewScore,
  memberId,
  name,
  phoneNumber,
  realOneseoArrivedYn,
  schoolName,
  schoolTeacherPhoneNumber,
  screening,
  secondTestPassYn,
  submitCode,
  entranceIntentionYn,
}: ApplicationTRProps) => {
  const [realOneseoDialogOpen, setRealOneseoDialogOpen] = useState(false);
  const [agreeDocDialogOpen, setAgreeDocDialogOpen] = useState(false);

  const { push } = useRouter();

  const 직무적성처리시작일자 = new Date(직무적성일자);
  const 심층면접처리시작일자 = new Date(심층면접일자);

  const [isRealOneseoArrived, setIsRealOneseoArrived] = useState<boolean>(
    realOneseoArrivedYn === 'YES',
  );
  const [entranceIntention, setEntranceIntention] = useState<'YES' | 'NO'>(entranceIntentionYn);

  const { mutate: patchArrivedStatus } = usePatchArrivedStatus(memberId, {
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      setIsRealOneseoArrived((prev) => !prev);
    },
  });

  const { mutate: patchAgreeDocStatus } = usePatchAgreeDocStatus(memberId, {
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      setEntranceIntention(entranceIntention === 'YES' ? 'NO' : 'YES');
    },
  });

  const { mutate: patchAptitudeScore } = usePatchAptitudeScore(memberId, {
    onSuccess: () => {
      refetch();
    },
  });
  const { mutate: patchInterviewScore } = usePatchInterviewScore(memberId, {
    onSuccess: () => {
      refetch();
    },
  });

  const firstTestResult =
    firstTestPassYn === 'YES' ? '합격' : firstTestPassYn === 'NO' ? '불합격' : '미정';
  const secondTestResult =
    secondTestPassYn === 'YES' ? '합격' : secondTestPassYn === 'NO' ? '불합격' : '미정';

  const is직무적성처리기간 = checkIsPassedDate(직무적성처리시작일자);
  const is심층면접처리기간 = checkIsPassedDate(심층면접처리시작일자);

  const formatted직무적성점수 = formatScore(String(aptitudeEvaluationScore ?? ''));
  const formatted심층면접점수 = formatScore(String(interviewScore ?? ''));

  const { control, watch, setValue } = useForm({
    defaultValues: {
      직무적성점수: formatted직무적성점수,
      심층면접점수: formatted심층면접점수,
    },
  });

  const debounced직무적성점수 = useDebounce(watch('직무적성점수'), 1000);
  const debounced심층면접점수 = useDebounce(watch('심층면접점수'), 1000);

  useEffect(() => {
    const formatAndSetScore = (score: string, fieldName: '직무적성점수' | '심층면접점수') => {
      const formattedScore = formatScore(score);
      setValue(fieldName, formattedScore !== 'NaN' ? formattedScore : '');
    };

    formatAndSetScore(debounced직무적성점수, '직무적성점수');
    formatAndSetScore(debounced심층면접점수, '심층면접점수');
  }, [debounced직무적성점수, debounced심층면접점수, setValue]);

  const handleRealOneseoArrived = () => {
    setRealOneseoDialogOpen(false);
    patchArrivedStatus();
    setIsRealOneseoArrived((prev) => !prev);
  };

  const handleAgreeDocArrived = () => {
    const updatedIntention = entranceIntention === 'YES' ? 'NO' : 'YES';
    setEntranceIntention(updatedIntention);
    setAgreeDocDialogOpen(false);
    patchAgreeDocStatus({ entranceIntentionYn: updatedIntention });
  };

  const handleAptitudeScore = () => {
    patchAptitudeScore({ aptitudeEvaluationScore: parseInt(watch('직무적성점수')) });
  };

  const handleInterviewScore = () => {
    patchInterviewScore({ interviewScore: parseInt(watch('심층면접점수')) });
  };

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="w-[100px] text-zinc-900">{submitCode}</TableCell>
          <TableCell className="w-[130px]">
            <AlertDialog open={realOneseoDialogOpen}>
              <Toggle
                onClick={() => setRealOneseoDialogOpen(true)}
                pressed={isRealOneseoArrived}
                icon={<CheckIcon />}
              >
                제출 완료
              </Toggle>
              <AlertDialogContent className="w-[400px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>서류 제출 여부를 변경하시겠습니까?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setRealOneseoDialogOpen(false)}>
                    취소
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleRealOneseoArrived}>변경하기</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TableCell>
          <TableCell className="w-[154px] font-semibold text-zinc-900">
            {name} <br />
            <span className="font-normal text-zinc-600">{phoneNumber}</span>
          </TableCell>
          <TableCell className="w-[154px] text-zinc-600">{schoolName}</TableCell>
          <TableCell className="max-w-full text-zinc-900">{ScreeningEnum[screening]}</TableCell>
          <TableCell className="w-[96px]">
            <Badge variant={firstTestResult}>{firstTestResult}</Badge>
          </TableCell>
          <TableCell className="w-[180px] text-zinc-400">
            {firstTestPassYn === 'YES' && is직무적성처리기간 ? (
              <div className={cn('flex', 'gap-1.5')}>
                <Controller
                  name="직무적성점수"
                  control={control}
                  render={({ field }) => <TextField {...field} disabled={!!secondTestPassYn} />}
                />
                <Button
                  variant={
                    watch('직무적성점수') && formatted직무적성점수 !== watch('직무적성점수')
                      ? 'default'
                      : 'subtitle'
                  }
                  onClick={handleAptitudeScore}
                  disabled={!!secondTestPassYn}
                >
                  저장
                </Button>
              </div>
            ) : (
              '진행 전'
            )}
          </TableCell>
          <TableCell className="w-[180px] text-zinc-400">
            {firstTestPassYn === 'YES' && is심층면접처리기간 ? (
              <div className={cn('flex', 'gap-1.5')}>
                <Controller
                  name="심층면접점수"
                  control={control}
                  render={({ field }) => <TextField {...field} disabled={!!secondTestPassYn} />}
                />
                <Button
                  variant={
                    watch('심층면접점수') && formatted심층면접점수 !== watch('심층면접점수')
                      ? 'default'
                      : 'subtitle'
                  }
                  onClick={handleInterviewScore}
                  disabled={!!secondTestPassYn}
                >
                  저장
                </Button>
              </div>
            ) : (
              '진행 전'
            )}
          </TableCell>
          <TableCell className="w-[96px]">
            <Badge variant={secondTestResult}>{secondTestResult}</Badge>
          </TableCell>
          <TableCell className="w-[130px]">
            <AlertDialog open={agreeDocDialogOpen}>
              <Toggle
                onClick={() => setAgreeDocDialogOpen(true)}
                pressed={entranceIntention === 'YES'}
                icon={<CheckIcon />}
              >
                제출 완료
              </Toggle>
              <AlertDialogContent className="w-[400px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>입학동의서 제출 여부를 변경하시겠습니까?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setAgreeDocDialogOpen(false)}>
                    취소
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleAgreeDocArrived}>변경하기</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TableCell>
          <TableCell className="w-[142px]">
            <Button
              onClick={() => push(`/edit/${memberId}?step=1`)}
              className="ml-[33.24px]"
              variant="outline"
            >
              원서수정
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ApplicantTR;
