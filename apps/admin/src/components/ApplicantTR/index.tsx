'use client';

import { checkIsPassedDate } from 'shared';

import { TextFiled } from 'admin/components';

import { CheckIcon } from 'shared/assets';
import { Table, TableBody, TableCell, Toggle, TableRow, Badge, Button } from 'shared/components';
import { cn } from 'shared/lib/utils';

const ApplicantTR = () => {
  // TODO 연산을 줄이기 위해 추후에는 테이블 상위 컴포넌트에서 일자 계산으로 변경
  const example직무적성처리시작일자 = new Date('2024-07-31');
  const example심층면접처리시작일자 = new Date('2024-08-30');

  const is직무적성처리기간 = checkIsPassedDate(example직무적성처리시작일자);
  const is심층면접처리기간 = checkIsPassedDate(example심층면접처리시작일자);

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="w-[100px] text-zinc-900">0189</TableCell>
          <TableCell className="w-[130px]">
            <Toggle icon={<CheckIcon />}>제출 완료</Toggle>
          </TableCell>
          <TableCell className="w-[154px] font-semibold text-zinc-900">
            진예원 <br />
            <span className="font-normal text-zinc-600">010 1234 5678</span>
          </TableCell>
          <TableCell className="w-[154px] text-zinc-600">대성여자중학교</TableCell>
          <TableCell className="max-w-full text-zinc-900">일반전형</TableCell>
          <TableCell className="w-[96px]">
            {is직무적성처리기간 ? (
              <div className={cn('flex', 'gap-1.5')}>
                <TextFiled />
                <Button variant="subtitle">저장</Button>
              </div>
            ) : (
              <Badge variant="미정">미정</Badge>
            )}
          </TableCell>
          <TableCell className="w-[180px] text-zinc-400">진행 전</TableCell>
          <TableCell className="w-[180px] text-zinc-400">진행 전</TableCell>
          <TableCell className="w-[96px]">
            {is심층면접처리기간 ? (
              <div className={cn('flex', 'gap-1.5')}>
                <TextFiled />
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
