import { UseFormRegister } from 'react-hook-form';

import { SelectIcon } from 'client/assets';
import { ScoreFormType } from 'client/types';

const array = [0, 1, 2, 3, 4, 5, 6, 7] as const;
const scoreArray = ['A', 'B', 'C', 'D', 'E'] as const;

interface SemesterFormProps {
  title:
    | '1학년 1학기'
    | '1학년 2학기'
    | '2학년 1학기'
    | '2학년 2학기'
    | '3학년 1학기'
    | '3학년 2학기';
  id: 'score1_1' | 'score1_2' | 'score2_1' | 'score2_2' | 'score3_1';
  register: UseFormRegister<ScoreFormType>;
}

const SemesterForm: React.FC<SemesterFormProps> = ({ title, id, register }) => (
  <div className="flex flex-col">
    <h1 className="mb-[20px] flex h-[55px] w-[127px] items-center justify-center rounded-[6px] bg-[#0C4680] text-[17px]/[24.62px] font-[700] text-[#F8F8F8]">
      {title}
    </h1>
    <div className="flex flex-col gap-[13px]">
      {array.map((item, idx) => (
        <div className="relative z-[1] rounded-[6px] bg-[#484453]" key={item}>
          <select
            className="relative z-[3] flex h-[37px] w-full cursor-pointer select-none appearance-none rounded-[6px] bg-transparent text-center text-[17px]/[24.62px] font-[500] text-[#FFFFFF8F]/[0.54]"
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
          <SelectIcon style="absolute right-5 top-1/2 z-[2] -translate-y-1/2 transform" />
        </div>
      ))}
    </div>
  </div>
);

export default SemesterForm;
