'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @rushstack/no-new-null */

import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Control, Controller, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { PinIcon } from 'shared/assets';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shared/components';
import { defaultSubjectArray, scoreArray } from 'shared/constants';
import { cn } from 'shared/lib/utils';
import { useStore } from 'shared/stores';

import type { ScoreFormType, SemesterIdType, SemesterType } from 'types';

const freeSemesterArray: SemesterType[] = [
  { title: '1학년 1학기', id: 'achievement1_1' },
  { title: '1학년 2학기', id: 'achievement1_2' },
  { title: '2학년 1학기', id: 'achievement2_1' },
  { title: '2학년 2학기', id: 'achievement2_2' },
  { title: '3학년 1학기', id: 'achievement3_1' },
] as const;

const defaultSubjectLength = defaultSubjectArray.length;

interface FreeSemesterFormProps {
  subjectArray: string[];
  control: Control<ScoreFormType, any>;
  setValue: UseFormSetValue<ScoreFormType>;
  register: UseFormRegister<ScoreFormType>;
  handleDeleteSubjectClick: (idx: number) => void;
  freeSemester: SemesterIdType | null | undefined;
  setFreeSemester: (semester: SemesterIdType | null) => void;
}

interface ScoreSelectProps {
  name: `${SemesterIdType}.${number}`;
  control: Control<ScoreFormType, any>;
  setValue: UseFormSetValue<ScoreFormType>;
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

const ScoreSelect = ({ name, control, setValue }: ScoreSelectProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { value } }) => (
      <Select onValueChange={(value) => setValue(name, value)} defaultValue={value && value}>
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
          {scoreArray.map((value, idx) => (
            <SelectItem value={String(5 - idx)} key={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )}
  />
);

const FreeSemesterForm = ({
  register,
  subjectArray,
  control,
  handleDeleteSubjectClick,
  setValue,
  freeSemester,
  setFreeSemester,
}: FreeSemesterFormProps) => {
  const store = useStore();

  useEffect(() => {
    console.log(store);

    return () => {
      console.log(store);
    };
  }, [freeSemester]);

  return (
    <div className={cn('flex', 'flex-col')}>
      <div
        className={cn(
          ...rowStyle,
          'bg-zinc-50',
          'rounded-t-[0.375rem]',
          'h-[3rem]',
          'border-t-[0.0625rem]',
          'justify-start',
        )}
      >
        <h1 className={cn(...itemStyle, 'w-[6.75rem]')}>과목명</h1>
        <div className={cn('flex')}>
          {freeSemesterArray.map(({ id, title }) => (
            <h1 key={id} className={cn(...itemStyle, 'w-[7.3375rem]')}>
              {title}
            </h1>
          ))}
        </div>
      </div>

      <div className={cn(...rowStyle, 'bg-white', 'h-[3rem]')}>
        <h1 className={cn(...itemStyle, 'w-[6.75rem]')}>자유학기제</h1>
        <div className={cn('flex')}>
          {freeSemesterArray.map(({ id }) => (
            <div key={id} className={cn(...itemStyle, 'w-[7.3375rem]')}>
              {freeSemester === id ? (
                <button
                  className={cn(
                    ...freeSemesterButtonStyle,
                    'border-emerald-500',
                    'text-emerald-500',
                  )}
                  type="button"
                >
                  <PinIcon type="ON" />
                  on
                </button>
              ) : (
                <button
                  className={cn(...freeSemesterButtonStyle)}
                  type="button"
                  onClick={() => setFreeSemester(id)}
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
          <div className={cn('flex', 'items-center')}>
            {freeSemesterArray.map(({ id }) => (
              <div key={id} className={cn(...itemStyle, 'w-[7.47917rem]')}>
                {freeSemester === id ? (
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
                  <ScoreSelect name={`${id}.${idx}`} control={control} setValue={setValue} />
                )}
              </div>
            ))}
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
