/* eslint-disable @rushstack/no-new-null */

import { UseFormRegister } from 'react-hook-form';

import { SelectIcon } from 'client/assets';
import { cn } from 'client/lib/utils';
import { ScoreFormType, SemesterId, SemesterTitleType } from 'client/types';

const scoreArray = ['A', 'B', 'C', 'D', 'E'] as const;

interface SemesterFormProps {
  title: SemesterTitleType;
  id: SemesterId;
  register: UseFormRegister<ScoreFormType>;
  subjectArray: string[];
  isFreeSemester?: true;
  freeSemester?: SemesterId | null;
  setFreeSemester?: React.Dispatch<React.SetStateAction<SemesterId | null>>;
}

const SemesterForm: React.FC<SemesterFormProps> = ({
  title,
  id,
  register,
  subjectArray,
  isFreeSemester,
  freeSemester,
  setFreeSemester,
}) => {
  const handleButtonClick = () => {
    if (setFreeSemester) setFreeSemester(id);
  };

  return (
    <div className={cn('flex', 'flex-col')}>
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
        {isFreeSemester && (
          <button
            onClick={handleButtonClick}
            className={cn(
              'flex',
              'justify-center',
              'items-center',
              'w-[127px]',
              'h-[37px]',
              'rounded-[6px]',
              `${freeSemester === id ? 'bg-[#19BAFF]' : 'bg-[#484453]'}`,
              `${freeSemester === id ? 'text-white' : 'text-[#ABA9B1]'}`,
            )}
          >
            {freeSemester === id ? 'ON' : 'OFF'}
          </button>
        )}
        {freeSemester === id
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
              <div className={cn('relative', 'z-[1]', 'rounded-[6px]', 'bg-[#484453]')} key={item}>
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
};

export default SemesterForm;
