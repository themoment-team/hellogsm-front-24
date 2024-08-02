import { UseFormRegister } from 'react-hook-form';

import { SelectIcon } from 'client/assets';
import { ScoreFormType } from 'client/types';

import { cn } from 'shared/lib/utils';

const artPhysicalSemesterArray = ['2학년 1학기', '2학년 2학기', '3학년 1학기'] as const;
const scoreArray = ['A', 'B', 'C', '없음'] as const;
const subjectArray = [
  '2_1체육',
  '2_1음악',
  '2_1미술',
  '2_2체육',
  '2_2음악',
  '2_2미술',
  '3_1체육',
  '3_1음악',
  '3_1미술',
] as const;

interface ArtPhysicalFormProps {
  register: UseFormRegister<ScoreFormType>;
}

const ArtPhysicalForm: React.FC<ArtPhysicalFormProps> = ({ register }) => {
  return (
    <div>
      <div className={cn('flex', 'gap-6')}>
        {artPhysicalSemesterArray.map((semester) => (
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
      <div className={cn('flex', 'flex-col', 'gap-x-6', 'gap-y-[13px]', 'flex-wrap', 'h-[137px]')}>
        {subjectArray.map((i, idx) => (
          <div
            className={cn('relative', 'z-[1]', 'rounded-[6px]', 'bg-[#484453]', 'w-[127px]')}
            key={i}
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
              {...register(`artsPhysicalAchievement.${idx}`)}
            >
              <option hidden>선택</option>
              {scoreArray.map((score, idx) => (
                <option key={score} value={score !== '없음' ? 5 - idx : 0}>
                  {score}
                </option>
              ))}
            </select>
            <SelectIcon
              style={cn('absolute', 'right-5', 'top-1/2', 'z-[2]', '-translate-y-1/2', 'transform')}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtPhysicalForm;
