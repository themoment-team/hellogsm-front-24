'use client';

import { useEffect, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { checkIsPassedDate } from 'shared';

import { TextField } from 'admin/components';

import { CheckIcon } from 'shared/assets';
import { Table, TableBody, TableCell, Toggle, TableRow, Badge, Button } from 'shared/components';
import { useDebounce } from 'shared/hooks';
import { cn } from 'shared/lib/utils';
import { formatScore } from 'shared/utils';

import { OneseoType, ScreeningEnum } from 'types/oneseo';

const ApplicantTR = ({
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
}: OneseoType) => {
  const example직무적성처리시작일자 = new Date('2024-07-31');
  const example심층면접처리시작일자 = new Date('2024-08-30');

  const [isRealOneseoArrived, setIsRealOneseoArrived] = useState<boolean>(
    realOneseoArrivedYn === 'YES',
  );

  const is직무적성처리기간 = checkIsPassedDate(example직무적성처리시작일자);
  const is심층면접처리기간 = checkIsPassedDate(example심층면접처리시작일자);

  const { control, watch, setValue } = useForm({
    defaultValues: {
      직무적성점수: '',
      심층면접점수: '',
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
    setIsRealOneseoArrived((prev) => !prev);
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
            {is직무적성처리기간 ? (
              <div className={cn('flex', 'gap-1.5')}>
                <Controller
                  name="직무적성점수"
                  control={control}
                  render={({ field }) => <TextField {...field} />}
                />
                <Button variant="subtitle">저장</Button>
              </div>
            ) : (
              <Badge variant="미정">미정</Badge>
            )}
          </TableCell>
          <TableCell className="w-[180px] text-zinc-400">
            {aptitudeEvaluationScore ?? '진행 전'}
          </TableCell>
          <TableCell className="w-[180px] text-zinc-400">{interviewScore ?? '진행 전'}</TableCell>
          <TableCell className="w-[96px]">
            {is심층면접처리기간 ? (
              <div className={cn('flex', 'gap-1.5')}>
                <Controller
                  name="심층면접점수"
                  control={control}
                  render={({ field }) => <TextField {...field} />}
                />
                <Button variant="subtitle">저장</Button>
              </div>
            ) : (
              <Badge variant="미정">미정</Badge>
            )}
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
