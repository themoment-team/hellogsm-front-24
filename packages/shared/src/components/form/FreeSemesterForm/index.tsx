'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @rushstack/no-new-null */

import { XIcon } from 'lucide-react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FreeSemesterValueEnum, type Step4FormType } from 'types';

import { PinIcon } from 'shared/assets';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shared/components';
import { GENERAL_SUBJECTS, SCORE_VALUES } from 'shared/constants';
import { cn } from 'shared/lib/utils';

const freeSemesterCandidateArray = [
  {
    title: '1학년 2학기',
    field: 'achievement1_2',
    value: FreeSemesterValueEnum['1-2'],
  },
  {
    title: '2학년 1학기',
    field: 'achievement2_1',
    value: FreeSemesterValueEnum['2-1'],
  },
  {
    title: '2학년 2학기',
    field: 'achievement2_2',
    value: FreeSemesterValueEnum['2-2'],
  },
  {
    title: '3학년 1학기',
    field: 'achievement3_1',
    value: FreeSemesterValueEnum['3-1'],
  },
] as const;

const freeSemesterGraduateArray = [
  {
    title: '1학년 2학기',
    field: 'achievement1_2',
    value: FreeSemesterValueEnum['1-2'],
  },
  {
    title: '2학년 1학기',
    field: 'achievement2_1',
    value: FreeSemesterValueEnum['2-1'],
  },
  {
    title: '2학년 2학기',
    field: 'achievement2_2',
    value: FreeSemesterValueEnum['2-2'],
  },
  {
    title: '3학년 1학기',
    field: 'achievement3_1',
    value: FreeSemesterValueEnum['3-1'],
  },
  {
    title: '3학년 2학기',
    field: 'achievement3_2',
    value: FreeSemesterValueEnum['3-2'],
  },
] as const;

const defaultSubjectLength = GENERAL_SUBJECTS.length;

interface FreeSemesterFormProps {
  subjectArray: string[];
  setValue: UseFormSetValue<Step4FormType>;
  register: UseFormRegister<Step4FormType>;
  watch: UseFormWatch<Step4FormType>;
  handleDeleteSubjectClick: (idx: number) => void;
  isCandidate: boolean;
  freeSemester: FreeSemesterValueEnum | null;
}

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

const freeSemesterButtonStyle = [
  'border-[0.0625rem]',
  'py-[0.25rem]',
  'px-[0.625rem]',
  'rounded-[6.25rem]',
  'text-sm',
  'font-medium',
  'leading-5',
  'text-slate-400',
  'border-slate-200',
  'flex',
  'items-center',
  'gap-[0.38rem]',
];

const FreeSemesterForm = ({
  register,
  subjectArray,
  setValue,
  watch,
  handleDeleteSubjectClick,
  isCandidate,
  freeSemester,
}: FreeSemesterFormProps) => {
  const freeSemesterArray = isCandidate ? freeSemesterCandidateArray : freeSemesterGraduateArray;

  return (
    <div className={cn('flex', 'flex-col')}>
      <div
        className={cn(
          ...rowStyle,
          'bg-zinc-50',
          'rounded-t-[0.375rem]',
          'h-[3rem]',
          'border-t-[0.0625rem]',
          'justify-between',
        )}
      >
        <h1 className={cn(...itemStyle, 'w-[6.75rem]')}>과목명</h1>
        <div className={cn('flex')}>
          {freeSemesterArray.map(({ title }) => (
            <h1 key={title} className={cn(...itemStyle, 'w-[7.3375rem]')}>
              {title}
            </h1>
          ))}
        </div>
      </div>

      <div className={cn(...rowStyle, 'bg-white', 'h-[3.5rem]')}>
        <h1 className={cn(...itemStyle, 'w-[6.75rem]')}>자유학기제</h1>
        <div className={cn('flex')}>
          {freeSemesterArray.map(({ value, field }) => (
            <div key={field} className={cn(...itemStyle, 'w-[7.3375rem]')}>
              {freeSemester === value ? (
                <button
                  className={cn(
                    ...freeSemesterButtonStyle,
                    'border-emerald-500',
                    'text-emerald-500',
                  )}
                  type="button"
                  onClick={() => setValue('freeSemester', null)}
                >
                  <PinIcon type="ON" />
                  on
                </button>
              ) : (
                <button
                  className={cn(...freeSemesterButtonStyle)}
                  type="button"
                  onClick={() => setValue('freeSemester', value)}
                >
                  <PinIcon type="OFF" />
                  off
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {subjectArray.map((subject, idx) => (
        <div
          key={subject}
          className={cn(
            ...rowStyle,
            'bg-white',
            'h-[3.5rem]',
            'relative',
            idx === subjectArray.length - 1 && 'rounded-b-[0.375rem]',
          )}
        >
          <div className={cn('h-full', 'w-[6.75rem]', 'flex', 'items-center', 'justify-center')}>
            {idx < defaultSubjectLength ? (
              <h1 className={cn(...itemStyle, 'w-full', 'w-[6.75rem]')}>{subject}</h1>
            ) : (
              <input
                type="text"
                className={cn(
                  'w-[5.25rem]',
                  'h-[2rem]',
                  'text-center',
                  'placeholder:text-slate-400',
                  'text-slate-900',
                  'border-[0.0625rem]',
                  'border-slate-300',
                  'rounded-md',
                  'text-[0.875rem]',
                  'font-normal',
                  'leading-[1.25rem]',
                )}
                {...register(`newSubjects.${idx - defaultSubjectLength}`)}
              />
            )}
          </div>
          <div className={cn('flex', 'items-center')}>
            {freeSemesterArray.map(({ value, field }) => {
              const score = watch(`${field}.${idx}`);

              return (
                <div key={field} className={cn(...itemStyle, 'w-[7.3375rem]')}>
                  {freeSemester === value ? (
                    <div
                      className={cn(
                        'px-[0.25rem]',
                        'py-[0.125rem]',
                        'text-gray-500',
                        'text-sm',
                        'font-medium',
                        'leading-5',
                        'rounded-[0.25rem]',
                        'bg-gray-100',
                      )}
                    >
                      자유학기제
                    </div>
                  ) : (
                    <div className={cn('w-[7.3375rem]', 'flex', 'justify-center')}>
                      <Select
                        onValueChange={(value) => setValue(`${field}.${idx}`, Number(value))}
                        defaultValue={isNaN(score) ? '' : String(score)}
                      >
                        <SelectTrigger
                          className={cn(
                            'w-[5.47917rem]',
                            'h-[2rem]',
                            'text-sm',
                            'font-normal',
                            'leading-5',
                            'bg-white',
                            'data-[placeholder]:text-slate-500',
                            'text-slate-900',
                            'px-[0.5rem]',
                            'border-slate-300',
                          )}
                        >
                          <SelectValue placeholder="성적 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {SCORE_VALUES.map(({ name, value }, idx) => (
                            <SelectItem value={String(value)} key={idx}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {idx >= defaultSubjectLength && (
            <button
              className={cn('absolute', 'right-[-1.97rem]')}
              onClick={() => handleDeleteSubjectClick(idx)}
            >
              <XIcon className={cn('stroke-slate-300', 'w-[1rem]', 'hover:stroke-slate-500')} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FreeSemesterForm;
