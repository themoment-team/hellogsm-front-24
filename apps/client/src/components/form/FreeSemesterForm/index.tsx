/* eslint-disable @rushstack/no-new-null */

import { UseFormRegister } from 'react-hook-form';

import { SelectIcon } from 'client/assets';
import { scoreArray } from 'client/constants';
import { cn } from 'client/lib/utils';
import type { ScoreFormType, SemesterIdType, SemesterType } from 'client/types';

const freeSemesterArray: SemesterType[] = [
  { title: '1학년 1학기', id: 'achievement1_1' },
  { title: '1학년 2학기', id: 'achievement1_2' },
  { title: '2학년 1학기', id: 'achievement2_1' },
  { title: '2학년 2학기', id: 'achievement2_2' },
  { title: '3학년 1학기', id: 'achievement3_1' },
] as const;

interface FreeSemesterFormProps {
  register: UseFormRegister<ScoreFormType>;
  subjectArray: string[];
  freeSemester: SemesterIdType | null;
  setFreeSemester: React.Dispatch<React.SetStateAction<SemesterIdType | null>>;
}

const FreeSemesterForm = ({
  register,
  subjectArray,
  freeSemester,
  setFreeSemester,
}: FreeSemesterFormProps) => {
  return (
    <>
      {freeSemesterArray.map(({ id, title }) => {
        const isFreeSemester = freeSemester === id;

        return (
          <div className={cn('flex', 'flex-col')} key={id}>
            <h1
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
              {title}
            </h1>
            <div className={cn('flex', 'flex-col', 'gap-[13px]')}>
              <button
                onClick={() => setFreeSemester(id)}
                className={cn(
                  'flex',
                  'justify-center',
                  'items-center',
                  'w-[127px]',
                  'h-[37px]',
                  'rounded-[6px]',
                  `${isFreeSemester ? 'bg-[#19BAFF]' : 'bg-[#484453]'}`,
                  `${isFreeSemester ? 'text-white' : 'text-[#ABA9B1]'}`,
                )}
              >
                {isFreeSemester ? 'ON' : 'OFF'}
              </button>
              {isFreeSemester
                ? subjectArray.map((i) => (
                    <div
                      className={cn(
                        'rounded-[6px]',
                        'bg-[#484453]',
                        'text-[17px]/[24.62px]',
                        'font-[500]',
                        'flex',
                        'text-[#FFFFFF8F]/[0.54]',
                        'h-[37px]',
                        'w-full',
                        'flex',
                        'justify-center',
                        'items-center',
                      )}
                      key={i}
                    >
                      자유학기제
                    </div>
                  ))
                : subjectArray.map((item, idx) => (
                    <div
                      className={cn('relative', 'z-[1]', 'rounded-[6px]', 'bg-[#484453]')}
                      key={item}
                    >
                      <select
                        className={cn(
                          'relative',
                          'z-[3]',
                          'flex',
                          'h-[37px]',
                          'w-full',
                          'cursor-pointer',
                          'select-none',
                          'appearance-none',
                          'rounded-[6px]',
                          'bg-transparent',
                          'text-center',
                          'text-[17px]/[24.62px]',
                          'font-[500]',
                          'text-[#FFFFFF8F]/[0.54]',
                        )}
                        defaultValue="선택"
                        {...register(`${id}.${idx}`)}
                      >
                        <option hidden>선택</option>
                        {scoreArray.map((score, idx) => (
                          <option key={score} value={5 - idx}>
                            {score}
                          </option>
                        ))}
                      </select>
                      <SelectIcon
                        style={cn(
                          'absolute',
                          'right-5',
                          'top-1/2',
                          'z-[2]',
                          '-translate-y-1/2',
                          'transform',
                        )}
                      />
                    </div>
                  ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FreeSemesterForm;
