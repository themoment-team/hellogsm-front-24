'use client';

import { useEffect, useState } from 'react';

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { checkIsPassedDate } from 'shared';
import { EditabilityType, OneseoListType, OneseoType, ScreeningEnum } from 'types';

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
  editableData: EditabilityType | undefined;
  oneseoRefetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<OneseoListType, Error>>;
  editableRefetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<EditabilityType, Error>>;
}

const ApplicantTR = ({
  oneseoRefetch,
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
  editableData,
  editableRefetch,
}: ApplicationTRProps) => {
  const [realOneseoDialogOpen, setRealOneseoDialogOpen] = useState(false);
  const [agreeDocDialogOpen, setAgreeDocDialogOpen] = useState(false);
  const [editOneseoDialogOpen, setEditOneseoDialogOpen] = useState(false);

  const { push } = useRouter();

  const 직무적성처리시작일자 = new Date(직무적성일자);
  const 심층면접처리시작일자 = new Date(심층면접일자);

  const [isRealOneseoArrived, setIsRealOneseoArrived] = useState<boolean>(
    realOneseoArrivedYn === 'YES',
  );
  const [entranceIntention, setEntranceIntention] = useState<'YES' | 'NO'>(entranceIntentionYn);

  const { mutate: patchArrivedStatus } = usePatchArrivedStatus(memberId, {
    onSuccess: () => {
      oneseoRefetch();
      editableRefetch();
    },
    onError: () => {
      setIsRealOneseoArrived((prev) => !prev);
    },
  });

  const { mutate: patchAgreeDocStatus } = usePatchAgreeDocStatus(memberId, {
    onSuccess: () => {
      oneseoRefetch();
      editableRefetch();
    },
    onError: () => {
      setEntranceIntention(entranceIntention === 'YES' ? 'NO' : 'YES');
    },
  });

  const { mutate: patchAptitudeScore } = usePatchAptitudeScore(memberId, {
    onSuccess: () => {
      oneseoRefetch();
      editableRefetch();
    },
  });
  const { mutate: patchInterviewScore } = usePatchInterviewScore(memberId, {
    onSuccess: () => {
      oneseoRefetch();
      editableRefetch();
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
    const 직무적성점수 = parseFloat(watch('직무적성점수'));

    if (직무적성점수 < 0 || 직무적성점수 > 100 || isNaN(직무적성점수)) return;

    patchAptitudeScore({ aptitudeEvaluationScore: 직무적성점수 });
  };

  const handleInterviewScore = () => {
    const 심층면접점수 = parseFloat(watch('심층면접점수'));

    if (심층면접점수 < 0 || 심층면접점수 > 100 || isNaN(심층면접점수)) return;

    patchInterviewScore({ interviewScore: 심층면접점수 });
  };

  const handleOneseoEdit = () => {
    if (editableData?.oneseoEditability === true) {
      push(`/edit/${memberId}?step=1`);
    } else {
      setEditOneseoDialogOpen(true);
    }
  };

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="w-[6.25rem] text-zinc-900">{submitCode}</TableCell>
          <TableCell className="w-[7.25rem] p-0">
            <AlertDialog open={realOneseoDialogOpen}>
              <Toggle
                onClick={() => setRealOneseoDialogOpen(true)}
                pressed={isRealOneseoArrived}
                icon={<CheckIcon />}
              >
                제출 완료
              </Toggle>
              <AlertDialogContent className="w-[25rem]">
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
          <TableCell className="w-[8.625rem] font-semibold text-zinc-900">
            {name} <br />
            <span className="font-normal text-zinc-600">{phoneNumber}</span>
          </TableCell>
          <TableCell className="w-[9.625rem] text-zinc-600">{schoolName}</TableCell>
          <TableCell className="w-[7.625rem] text-zinc-900">{ScreeningEnum[screening]}</TableCell>
          <TableCell className="w-[6rem]">
            <Badge variant={firstTestResult}>{firstTestResult}</Badge>
          </TableCell>
          <TableCell className="w-[11.25rem] text-zinc-400">
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
          <TableCell className="w-[11.25rem] text-zinc-400">
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
          <TableCell className="w-[6rem]">
            <Badge variant={secondTestResult}>{secondTestResult}</Badge>
          </TableCell>
          <TableCell className="w-[8.125rem]">
            <AlertDialog open={agreeDocDialogOpen}>
              <Toggle
                onClick={() => setAgreeDocDialogOpen(true)}
                pressed={entranceIntention === 'YES'}
                icon={<CheckIcon />}
                disabled={secondTestPassYn !== 'YES'}
              >
                제출 완료
              </Toggle>
              <AlertDialogContent className="w-[25rem]">
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
          <TableCell className="w-[8.875rem]">
            <Button onClick={handleOneseoEdit} className="ml-[33.24px]" variant="outline">
              원서수정
            </Button>
            <AlertDialog open={editOneseoDialogOpen}>
              <AlertDialogContent className="w-[25rem]">
                <AlertDialogHeader>
                  <AlertDialogTitle>원서 수정을 할 수 없는 기간입니다.</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setEditOneseoDialogOpen(false)}>
                    닫기
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ApplicantTR;
