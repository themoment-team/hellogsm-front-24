import { forwardRef } from 'react';

import { SelectIcon } from 'client/assets';

const scoreArray = ['A', 'B', 'C', 'D', 'E'] as const;

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const ScoreSelect = forwardRef<HTMLSelectElement, Props>(({ ...attributes }, ref) => {
  return (
    <div className="relative">
      {/* <label htmlFor="select"></label> */}
      <select
        id="select"
        {...attributes}
        ref={ref}
        className="flex h-[37px] w-full cursor-pointer appearance-none rounded-[6px] bg-[#484453] text-center text-[17px]/[24.62px] font-[500] text-[#FFFFFF8F]/[0.54]"
        defaultValue="선택"
      >
        <option hidden>선택</option>
        {scoreArray.map((score, idx) => (
          <option key={score} value={5 - idx}>
            {score}
          </option>
        ))}
      </select>
      <SelectIcon style="absolute top-1/2 right-5 transform -translate-y-1/2" />
    </div>
  );
});

ScoreSelect.displayName = 'ScoreSelect';

export default ScoreSelect;
