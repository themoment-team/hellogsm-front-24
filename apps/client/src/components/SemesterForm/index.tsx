import { UseFormRegister } from 'react-hook-form';

import { ScoreSelect } from 'client/components';
import { ScoreFormType } from 'client/types';

const array = [0, 1, 2, 3, 4, 5, 6, 7] as const;

const registerConvertor = {
  '1학년 1학기': 'score1_1',
  '1학년 2학기': 'score1_2',
  '2학년 1학기': 'score2_1',
  '2학년 2학기': 'score2_2',
  '3학년 1학기': 'score3_1',
  '3학년 2학기': 'score3_2',
} as const;

interface Props {
  title:
    | '1학년 1학기'
    | '1학년 2학기'
    | '2학년 1학기'
    | '2학년 2학기'
    | '3학년 1학기'
    | '3학년 2학기';
  register: UseFormRegister<ScoreFormType>;
}

const SemesterForm: React.FC<Props> = ({ title, register }) => {
  const registerId = registerConvertor[title];

  return (
    <div className="flex flex-col">
      <h1 className="mb-[20px] flex h-[55px] w-[127px] items-center justify-center rounded-[6px] bg-[#0C4680] text-[17px]/[24.62px] font-[700] text-[#F8F8F8]">
        {title}
      </h1>
      <div className="flex flex-col gap-[13px]">
        {array.map((item, idx) => (
          <ScoreSelect key={item} {...register(`${registerId}.${idx}`)} />
        ))}
      </div>
    </div>
  );
};

export default SemesterForm;
