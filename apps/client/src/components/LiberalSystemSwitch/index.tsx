import { GradesInputMethodType } from 'client/types';

import { cn } from 'shared/lib/utils';

interface LiberalSystemSwitchProps {
  liberalSystem: GradesInputMethodType;
  setLiberalSystem: React.Dispatch<React.SetStateAction<GradesInputMethodType>>;
}

const buttonStyle = (isMyLiberalSystem: boolean) => [
  'px-[0.75rem]',
  'py-[0.375rem]',
  'rounded-[0.1875rem]',
  'text-sm',
  'font-medium',
  'leading-5',
  isMyLiberalSystem ? 'bg-white' : 'bg-slate-100',
  isMyLiberalSystem ? 'text-slate-900' : 'text-slate-700',
];

const LiberalSystemSwitch = ({ liberalSystem, setLiberalSystem }: LiberalSystemSwitchProps) => (
  <div
    className={cn('bg-slate-100', 'subtle-medium', 'p-[0.3125rem]', 'flex', 'rounded-md', 'w-fit')}
  >
    <button
      type="button"
      onClick={() => setLiberalSystem('freeGrade')}
      className={cn(...buttonStyle(liberalSystem === 'freeGrade'))}
    >
      자유학년제
    </button>
    <button
      type="button"
      onClick={() => setLiberalSystem('freeSemester')}
      className={cn(...buttonStyle(liberalSystem === 'freeSemester'))}
    >
      자유학기제
    </button>
  </div>
);

export default LiberalSystemSwitch;