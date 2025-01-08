'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { XIcon } from 'lucide-react';
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Step4FormType } from 'types';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'shared/components/ui';
import { GENERAL_SUBJECTS, SCORE_VALUES } from 'shared/constants';
import { cn } from 'shared/lib/utils';

const defaultSubjectLength = GENERAL_SUBJECTS.length;

const freeGradeCandidateArray = [
  { title: '2학년 1학기', field: 'achievement2_1' },
  { title: '2학년 2학기', field: 'achievement2_2' },
  { title: '3학년 1학기', field: 'achievement3_1' },
] as const;

const freeGradeGraduateArray = [
  { title: '2학년 1학기', field: 'achievement2_1' },
  { title: '2학년 2학기', field: 'achievement2_2' },
  { title: '3학년 1학기', field: 'achievement3_1' },
  { title: '3학년 2학기', field: 'achievement3_2' },
] as const;

interface FreeGradeFormProps {
  subjectArray: string[];
  control: Control<Step4FormType, any>;
  setValue: UseFormSetValue<Step4FormType>;
  register: UseFormRegister<Step4FormType>;
  watch: UseFormWatch<Step4FormType>;
  handleDeleteSubjectClick: (idx: number) => void;
  isCandidate: boolean;
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

const FreeGradeForm = ({
  subjectArray,
  setValue,
  register,
  watch,
  handleDeleteSubjectClick,
  isCandidate,
}: FreeGradeFormProps) => {
  const freeGradeArray = isCandidate ? freeGradeCandidateArray : freeGradeGraduateArray;

  return (
    <div className={cn('flex', 'flex-col')}>
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
          {freeGradeArray.map(({ title }) => (
            <h1 key={title} className={cn(...itemStyle, 'w-[7.47917rem]')}>
              {title}
            </h1>
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
          <div className={cn('h-full', 'w-[6.25rem]', 'flex', 'items-center', 'justify-center')}>
            {idx < defaultSubjectLength ? (
              <h1 className={cn(...itemStyle, 'w-full')}>{subject}</h1>
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
          <div className={cn('flex')}>
            {freeGradeArray.map(({ field }) => {
              const score = watch(`${field}.${idx}`);

              return (
                <div key={field} className={cn(...itemStyle, 'w-[7.47917rem]')}>
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

export default FreeGradeForm;
