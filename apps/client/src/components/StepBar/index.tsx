'use client';

import { useState, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from 'shared';

import { CheckIcon, ProgressBarIcon } from 'client/assets';

import { cn } from 'shared/lib/utils';

export enum Steps {
  ONE = 1,
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
  const isActiveOrCompleted = isActive || isCompleted;

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
        isActiveOrCompleted ? 'bg-blue-500 text-white' : 'border-[1px] text-slate-300',
      )}
    >
      {isCompleted ? <CheckIcon /> : step}
    </div>
  );
};

const ProgressBars = ({ isCompleted }: { isCompleted: boolean }) => {
  return <ProgressBarIcon color={isCompleted ? '#2563eb' : '#CBD5E1'} />;
};

const StepBar = () => {
  const router = useRouter();
  const params = useSearchParams();

  const [currentStep, setCurrentStep] = useState(Steps.ONE);

  useEffect(() => {
    const stepNumber = Number(params.get('step')) || Steps.ONE;
    if (stepNumber >= Steps.ONE && stepNumber <= Steps.FOUR) {
      setCurrentStep(stepNumber);
    }
  }, [params]);

  const updateStep = (newStep: Steps) => {
    if (newStep !== currentStep) {
      router.push(`/register?step=${newStep}`);
    }
  };

  const handleNext = () => {
    const nextStep = Math.min(currentStep + 1, Steps.FOUR);
    updateStep(nextStep);
  };

  const handlePrevious = () => {
    const prevStep = Math.max(currentStep - 1, Steps.ONE);
    updateStep(prevStep);
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
            <Step step={step} isActive={currentStep === step} isCompleted={currentStep > step} />
            {index < Steps.FOUR - 1 && <ProgressBars isCompleted={currentStep > step} />}
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
          {currentStep === Steps.FOUR ? '점수 확인하기' : '다음으로'}
        </Button>
      </div>
    </div>
  );
};

export default StepBar;
