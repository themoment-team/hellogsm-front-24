import { forwardRef } from 'react';

const scoreArray = ['A', 'B', 'C', 'D', 'E'] as const;

const ScoreSelect = forwardRef<HTMLSelectElement>(({}, ref) => {
  return (
    <select ref={ref}>
      <option hidden selected>
        선택
      </option>
      {scoreArray.map((score, index) => (
        <option value={5 - index} key={score}>
          {score}
        </option>
      ))}
    </select>
  );
});

ScoreSelect.displayName = 'ScoreSelect';

export default ScoreSelect;
