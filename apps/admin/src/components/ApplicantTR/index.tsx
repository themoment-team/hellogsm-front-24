'use client';

import { useEffect, useState } from 'react';

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

import { useForm, Controller } from 'react-hook-form';
import { checkIsPassedDate } from 'shared';

import { TextField } from 'admin/components';

import { CheckIcon } from 'shared/assets';
import { Table, TableBody, TableCell, Toggle, TableRow, Badge, Button } from 'shared/components';
import { 심층면접일자, 직무적성일자 } from 'shared/constants';
import { useDebounce } from 'shared/hooks';
import { cn } from 'shared/lib/utils';
import { formatScore } from 'shared/utils';

import { usePatchArrivedStatus, usePatchAptitudeScore, usePatchInterviewScore } from 'api/hooks';

import { OneseoListType, OneseoType, ScreeningEnum } from 'types/oneseo';

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
}: ApplicationTRProps) => {
  const 직무적성처리시작일자 = new Date(직무적성일자);
  const 심층면접처리시작일자 = new Date(심층면접일자);

  const [isRealOneseoArrived, setIsRealOneseoArrived] = useState<boolean>(
    realOneseoArrivedYn === 'YES',
  );

  const { mutate: patchArrivedStatus } = usePatchArrivedStatus(memberId, {
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      setIsRealOneseoArrived((prev) => !prev);
    },
  });

  const { mutate: patchAptitudeScore } = usePatchAptitudeScore(memberId);
  const { mutate: patchInterviewScore } = usePatchInterviewScore(memberId);

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
    patchArrivedStatus();
    setIsRealOneseoArrived((prev) => !prev);
  };

  const handleAptitudeScore = () => {
    patchAptitudeScore({ score: parseInt(watch('직무적성점수')) });
  };

  const handleInterviewScore = () => {
    patchInterviewScore({ score: parseInt(watch('심층면접점수')) });
  };

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="w-[100px] text-zinc-900">{submitCode}</TableCell>
          <TableCell className="w-[130px]">
            <Toggle
              onClick={handleRealOneseoArrived}
              pressed={isRealOneseoArrived}
              icon={<CheckIcon />}
            >
              제출 완료
            </Toggle>
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
            {is직무적성처리기간 ? (
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
            {is심층면접처리기간 ? (
              <div className={cn('flex', 'gap-1.5')}>
                <Controller
                  name="심층면접점수"
                  control={control}
                  render={({ field }) => <TextField {...field} disabled={!!secondTestPassYn} />}
                />
                <Button
                  variant={
                    watch('직무적성점수') && formatted심층면접점수 !== watch('심층면접점수')
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
          <TableCell className="w-[149px]">
            <Button className="ml-[33.24px]" variant="outline">
              원서수정
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ApplicantTR;
