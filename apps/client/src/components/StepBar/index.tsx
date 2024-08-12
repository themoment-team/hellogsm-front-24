import { useState } from 'react';

import { Button } from 'shared';

import { CheckIcon, ProgressBar } from 'client/assets';

import { cn } from 'shared/lib/utils';

export enum Steps {
  ONE,
  TWO,
  THREE,
  FOUR,
}

interface StepType {
  step: number;
  isActive: boolean;
  isCompleted: boolean;
}

const Step = ({ step, isActive, isCompleted }: StepType) => {
  return (
    <div
      className={cn(
        'flex',
        'justify-center',
        'items-center',
        'w-[2rem]',
        'h-[2rem]',
        'rounded-full',
        'font-semibold',
        'text-body2',
        'transition-all',
        'duration-500',
        'transform',
        isActive || isCompleted ? 'bg-blue-500' : '',
        isActive || isCompleted ? 'text-white' : 'text-slate-300',
        isActive || isCompleted ? '' : 'border-[1px]',
      )}
    >
      {isCompleted ? <CheckIcon /> : step}
    </div>
  );
};

const ProgressBars = ({ isCompleted }: { isCompleted: boolean }) => {
  return <ProgressBar color={isCompleted ? '#2563eb' : '#CBD5E1'} />;
};

const StepBar = () => {
  const [currentStep, setCurrentStep] = useState(Steps.ONE);

  const handleNext = () => {
    setCurrentStep((prevStep) => (prevStep < Steps.FOUR ? prevStep + 1 : prevStep));
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => (prevStep > Steps.ONE ? prevStep - 1 : prevStep));
  };

  return (
    <div
      className={cn(
        'flex',
        'h-[4.25rem]',
        'px-[1.75rem]',
        'py-[1.125rem]',
        'justify-between',
        'items-center',
        'rounded-t-[1.125rem]',
        'bg-white',
        'border-solid',
        'border-b',
        'border-gray-100',
      )}
    >
      <div className={cn('flex', 'items-center', 'gap-[0.5rem]')}>
        {[Steps.ONE, Steps.TWO, Steps.THREE, Steps.FOUR].map((step, index) => (
          <div key={step} className={cn('flex', 'items-center', 'gap-[0.5rem]')}>
            <Step
              step={step + 1}
              isActive={currentStep === step}
              isCompleted={currentStep > step}
            />
            {index < Steps.FOUR && <ProgressBars isCompleted={currentStep > step} />}
          </div>
        ))}
      </div>
      <div className={cn('flex', 'gap-[0.5rem]')}>
        {currentStep > Steps.ONE && (
          <Button variant="ghost" onClick={handlePrevious}>
            이전
          </Button>
        )}
        <Button variant="submit" onClick={handleNext}>
          다음으로
        </Button>
      </div>
    </div>
  );
};

export default StepBar;
