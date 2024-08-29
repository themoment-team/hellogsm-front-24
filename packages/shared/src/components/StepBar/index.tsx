'use client';

import { useState, useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormWatch,
} from 'react-hook-form';
import { basicRegisterType, GraduationType, MajorType, ScreeningType } from 'types';

import { StepCheckIcon, ProgressBarIcon } from 'shared/assets';
import { Button } from 'shared/components';
import { cn } from 'shared/lib/utils';
import { useStore } from 'shared/stores';

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
      {isCompleted ? <StepCheckIcon /> : step}
    </div>
  );
};

interface StepBarType {
  param?: string;
  handleSubmit: UseFormHandleSubmit<basicRegisterType>;
  watch: UseFormWatch<basicRegisterType>;
}

const StepBar = ({ param, handleSubmit, watch }: StepBarType) => {
  const { push } = useRouter();
  const params = useSearchParams();
  const path = usePathname();
  const store = useStore();

  const [currentStep, setCurrentStep] = useState(Steps.ONE);

  useEffect(() => {
    const stepNumber = Number(params.get('step')) || Steps.ONE;
    if (stepNumber >= Steps.ONE && stepNumber <= Steps.FOUR) {
      setCurrentStep(stepNumber);
    }
  }, [params]);

  const updateStep = (newStep: Steps) => {
    if (newStep !== currentStep) {
      push(`${path}?step=${newStep}`);
    }
  };

  const handleStep1Errors = () => {
    const { img, address, detailAddress, phoneNumber } = watch();
    if (img && address && detailAddress && phoneNumber) {
      const { setProfileImg, setAddress, setDetailAddress } = store;

      setProfileImg(img);
      setAddress(address);
      setDetailAddress(detailAddress);

      updateStep(Math.min(currentStep + 1, Steps.FOUR));
    }
  };

  const handleStep2Errors = () => {
    const { category, schoolName, year, month, screening, choice, schoolAddress } = watch();
    if (category && schoolName && year && month && screening && choice && schoolAddress) {
      const {
        setScreening,
        setFirstDesiredMajor,
        setSecondDesiredMajor,
        setThirdDesiredMajor,
        setGraduationType,
        setSchoolName,
        setSchoolAddress,
      } = store;

      const categoryConvertor: { [key: string]: GraduationType } = {
        졸업자: 'GRADUATE',
        졸업예정: 'CANDIDATE',
        검정고시: 'GED',
      };

      const screeningConvertor: { [key: string]: ScreeningType } = {
        일반전형: 'GENERAL',
        사회통합전형: 'SPECIAL',
        '정원 외 특별전형': 'EXTRA_ADMISSION',
      };

      const majorConvertor: { [key: string]: MajorType } = {
        소프트웨어개발과: 'SW',
        스마트IOT과: 'IOT',
        인공지능과: 'AI',
      };

      setScreening(screeningConvertor[screening]);
      setFirstDesiredMajor(majorConvertor[choice[0]]);
      setSecondDesiredMajor(majorConvertor[choice[1]]);
      setThirdDesiredMajor(majorConvertor[choice[2]]);
      setGraduationType(categoryConvertor[category]);
      setSchoolName(schoolName);
      setSchoolAddress(schoolAddress);

      updateStep(Math.min(currentStep + 1, Steps.FOUR));
    }
  };

  const handleStep3Errors = () => {
    const {
      guardianName,
      guardianPhoneNumber,
      relationship,
      schoolTeacherName,
      schoolTeacherPhoneNumber,
    } = watch();
    if (
      guardianName &&
      guardianPhoneNumber &&
      relationship &&
      schoolTeacherName &&
      schoolTeacherPhoneNumber
    ) {
      const {
        setGuardianName,
        setGuardianPhoneNumber,
        setRelationshipWithGuardian,
        setSchoolTeacherName,
        setSchoolTeacherPhoneNumber,
      } = store;

      setGuardianName(guardianName);
      setGuardianPhoneNumber(guardianPhoneNumber);
      setRelationshipWithGuardian(relationship);
      setSchoolTeacherName(schoolTeacherName);
      setSchoolTeacherPhoneNumber(schoolTeacherPhoneNumber);

      updateStep(Math.min(currentStep + 1, Steps.FOUR));
    }
  };

  const onSubmit: SubmitHandler<basicRegisterType> = (data) => {
    // eslint-disable-next-line no-console
    const nextStep = Math.min(currentStep + 1, Steps.FOUR);
    updateStep(nextStep);
  };

  const onError: SubmitErrorHandler<basicRegisterType> = (errors) => {
    // eslint-disable-next-line no-console
    console.log(errors);
    switch (param) {
      case '1':
        handleStep1Errors();
        break;
      case '2':
        handleStep2Errors();
        break;
      case '3':
        handleStep3Errors();
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    handleSubmit(onSubmit, onError)();
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
            {index < Steps.FOUR - 1 && (
              <ProgressBarIcon color={currentStep > step ? '#2563eb' : '#CBD5E1'} />
            )}
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
