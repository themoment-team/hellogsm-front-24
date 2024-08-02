import { UseFormRegister } from 'react-hook-form';

import { ScoreFormType } from 'client/types';

import { cn } from 'shared/lib/utils';

interface NonSubjectFormProps {
  register: UseFormRegister<ScoreFormType>;
}

const absentArray = ['1학년 결석', '2학년 결석', '3학년 결석'] as const;

const attendanceArray = [
  '1학년 지각',
  '2학년 지각',
  '3학년 지각',
  '1학년 조퇴',
  '2학년 조퇴',
  '3학년 조퇴',
  '1학년 결과',
  '2학년 결과',
  '3학년 결과',
] as const;

export const nonSubjectArray = ['결석', '지각', '조퇴', '결과', '봉사활동(시간)'] as const;

const volunteerArray = ['1학년 봉사', '2학년 봉사', '3학년 봉사'] as const;

const inputClass = cn(
  'w-[127px]',
  'h-[37px]',
  'rounded-[6px]',
  'bg-[#484453]',
  'text-center',
  'text-[17px]/[24.62px]',
  'font-[500]',
  'text-[#FFFFFF8F]/[0.54]',
);

const NonSubjectForm = ({ register }: NonSubjectFormProps) => (
  <div className={cn('flex', 'flex-col')}>
    <div className={cn('flex', 'gap-6')}>
      {nonSubjectArray.map((semester) => (
        <h1
          key={semester}
          className={cn(
            'mb-[20px]',
            'flex',
            'h-[55px]',
            'w-[127px]',
            'items-center',
            'justify-center',
            'rounded-[6px]',
            'bg-[#0C4680]',
            'text-[17px]/[24.62px]',
            'font-[700]',
            'text-[#F8F8F8]',
          )}
        >
          {semester}
        </h1>
      ))}
    </div>
    <div className={cn('flex', 'gap-6')}>
      <div className={cn('flex', 'flex-col', 'gap-[13px]')}>
        {absentArray.map((grade, idx) => (
          <input
            type="number"
            key={grade}
            className={inputClass}
            {...register(`absentDays.${idx}`)}
          />
        ))}
      </div>
      <div className={cn('flex', 'flex-col', 'gap-x-6', 'gap-y-[13px]', 'flex-wrap', 'h-[137px]')}>
        {attendanceArray.map((grade, idx) => (
          <input
            type="number"
            key={grade}
            className={inputClass}
            {...register(`attendanceDays.${idx}`)}
          />
        ))}
      </div>
      <div className={cn('flex', 'flex-col', 'gap-[13px]')}>
        {volunteerArray.map((grade, idx) => (
          <input
            type="number"
            key={grade}
            className={inputClass}
            {...register(`volunteerTime.${idx}`)}
          />
        ))}
      </div>
    </div>
  </div>
);

export default NonSubjectForm;
