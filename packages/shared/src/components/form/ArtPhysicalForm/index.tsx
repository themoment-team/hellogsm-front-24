'use client';

import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FreeSemesterValueEnum, GraduationTypeValueEnum, Step4FormType } from 'types';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shared/components';
import { ART_PHYSICAL_SCORE_VALUES } from 'shared/constants';
import { cn } from 'shared/lib/utils';

interface ArtPhysicalFormProps {
  setValue: UseFormSetValue<Step4FormType>;
  watch: UseFormWatch<Step4FormType>;
  isFreeGrade: boolean;
  graduationType: GraduationTypeValueEnum.CANDIDATE | GraduationTypeValueEnum.GRADUATE;
  freeSemester: FreeSemesterValueEnum | null;
}

const artPhysicalGraduationArray = [
  '1학년 2학기',
  '2학년 1학기',
  '2학년 2학기',
  '3학년 1학기',
  '3학년 2학기',
] as const;

const artPhysicalCandidateArray = [
  '1학년 2학기',
  '2학년 1학기',
  '2학년 2학기',
  '3학년 1학기',
] as const;

const artPhysicalGraduationIndexArray = [
  { subject: '체육', registerIndexList: [0, 3, 6, 9] },
  { subject: '음악', registerIndexList: [1, 4, 7, 10] },
  { subject: '미술', registerIndexList: [2, 5, 8, 11] },
] as const;

const artPhysicalCandidateIndexArray = [
  { subject: '체육', registerIndexList: [0, 3, 6] },
  { subject: '음악', registerIndexList: [1, 4, 7] },
  { subject: '미술', registerIndexList: [2, 5, 8] },
] as const;

const SemesterIdToTitle = {
  '1-2': '1학년 2학기',
  '2-1': '2학년 1학기',
  '2-2': '2학년 2학기',
  '3-1': '3학년 1학기',
  '3-2': '3학년 2학기',
};

const itemStyle = [
  'h-full',
  'flex',
  'justify-center',
  'items-center',
  'text-sm',
  'font-semibold',
  'leading-6',
  'text-zinc-500',
];

const rowStyle = [
  'flex',
  'w-full',
  'justify-between',
  'border-x-[0.0625rem]',
  'border-b-[0.0625rem]',
  'border-zinc-200',
  'items-center',
];

const ArtPhysicalForm = ({
  setValue,
  isFreeGrade,
  graduationType,
  freeSemester,
  watch,
}: ArtPhysicalFormProps) => {
  const artPhysicalArray = (() => {
    if (graduationType === GraduationTypeValueEnum.CANDIDATE) {
      if (freeSemester)
        return artPhysicalCandidateArray.filter(
          (semester) => semester !== SemesterIdToTitle[freeSemester],
        );
      return artPhysicalCandidateArray.slice(1);
    } else {
      if (freeSemester)
        return artPhysicalGraduationArray.filter(
          (semester) => semester !== SemesterIdToTitle[freeSemester],
        );
      return artPhysicalGraduationArray.slice(1);
    }
  })();

  const artPhysicalIndexArray =
    graduationType === 'CANDIDATE'
      ? artPhysicalCandidateIndexArray
      : artPhysicalGraduationIndexArray;

  return (
    <div className={cn('flex', 'flex-col', 'w-full')}>
      <div
        className={cn(
          ...rowStyle,
          'bg-zinc-50',
          'rounded-t-[0.375rem]',
          'h-[3rem]',
          'border-t-[0.0625rem]',
        )}
      >
        <h1 className={cn(...itemStyle, 'w-[6.25rem]')}>과목명</h1>
        <div className={cn('flex')}>
          {artPhysicalArray.map((title) => (
            <h1
              key={title}
              className={cn(...itemStyle, isFreeGrade ? 'w-[7.47917rem]' : 'w-[10.3125rem]')}
            >
              {title}
            </h1>
          ))}
        </div>
      </div>
      {artPhysicalIndexArray.map(({ subject, registerIndexList }, index) => (
        <div
          key={subject}
          className={cn(
            ...rowStyle,
            'bg-white',
            'h-[3.5rem]',
            index === artPhysicalIndexArray.length - 1 && 'rounded-b-[0.375rem]',
          )}
        >
          <div className={cn('h-full', 'w-[6.25rem]', 'flex', 'items-center', 'justify-center')}>
            <h1 className={cn(...itemStyle, 'w-full')}>{subject}</h1>
          </div>
          <div className={cn('flex')}>
            {registerIndexList.map((registerIndex) => {
              const score = watch(`artsPhysicalAchievement.${registerIndex}`);

              return (
                <div
                  key={registerIndex}
                  className={cn(...itemStyle, isFreeGrade ? 'w-[7.47917rem]' : 'w-[10.3125rem]')}
                >
                  <Select
                    onValueChange={(value) =>
                      setValue(`artsPhysicalAchievement.${registerIndex}`, Number(value))
                    }
                    defaultValue={score ? String(score) : ''}
                  >
                    <SelectTrigger
                      className={cn(
                        'h-[2rem]',
                        'text-sm',
                        'font-normal',
                        'leading-5',
                        'bg-white',
                        'data-[placeholder]:text-slate-500',
                        'text-slate-900',
                        'px-[0.5rem]',
                        'border-slate-300',
                        isFreeGrade ? 'w-[5.47917rem]' : 'w-[8.3125rem]',
                      )}
                    >
                      <SelectValue placeholder="성적 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {ART_PHYSICAL_SCORE_VALUES.map(({ name, value }) => (
                        <SelectItem value={String(value)} key={value}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtPhysicalForm;
