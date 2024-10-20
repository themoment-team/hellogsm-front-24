'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { usePostMockScore } from 'api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import {
  basicRegisterType,
  GraduationType,
  MajorType,
  MiddleSchoolAchievementType,
  MockScoreType,
  ScreeningType,
  GEDAchievementType,
  FreeSemesterType,
} from 'types';

import { StepCheckIcon, ProgressBarIcon } from 'shared/assets';
import { Button, ScoreCalculateDialog } from 'shared/components';
import { cn } from 'shared/lib/utils';
import { basicRegisterSchema } from 'shared/schemas';
import { useStore } from 'shared/stores';

const freeSemesterConvertor = {
  achievement1_2: '1-2',
  achievement2_1: '2-1',
  achievement2_2: '2-2',
  achievement3_1: '3-1',
  achievement3_2: '3-2',
} as const;

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
  isStep4Clickable: boolean;
  setIsButtonClick: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<basicRegisterType>;
}

const StepBar = ({
  param,
  handleSubmit,
  watch,
  isStep4Clickable,
  setIsButtonClick,
  setValue,
}: StepBarType) => {
  const { push } = useRouter();
  const params = useSearchParams();
  const path = usePathname();
  const store = useStore();
  const [isDialog, setIsDialog] = useState(false);
  const [isClickable, setIsClickable] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(Steps.ONE);
  const [scoreCalculateDialogData, setScoreCalculateDialogData] = useState<MockScoreType | null>(
    null,
  );

  const { mutate: postMockScore } = usePostMockScore(store.graduationType!, {
    onSuccess: (data) => {
      setScoreCalculateDialogData(data);
      setIsDialog(true);
    },
    onError: () => {},
  });

  useEffect(() => {
    if (param === '1') {
      const { img, address, detailAddress } = watch();
      const step1IsClickable = img && address && detailAddress ? true : false;

      return setIsClickable(step1IsClickable);
    }

    if (param === '2') {
      const { category, schoolName, schoolAddress, month, year, choice, screening } = watch();

      const step2IsClickable =
        category &&
        schoolName &&
        schoolAddress &&
        month &&
        year &&
        choice[0] &&
        choice[1] &&
        choice[2] &&
        screening
          ? true
          : false;

      return setIsClickable(step2IsClickable);
    }

    if (param === '3') {
      const {
        img,
        address,
        detailAddress,
        category,
        schoolName,
        schoolAddress,
        month,
        year,
        choice,
        screening,
        guardianName,
        guardianPhoneNumber,
        schoolTeacherName,
        schoolTeacherPhoneNumber,
        relationship,
        otherRelationship,
      } = watch();

      const validationResult = basicRegisterSchema.safeParse({
        img,
        address,
        detailAddress,
        category,
        schoolName,
        schoolAddress,
        month,
        year,
        choice,
        screening,
        guardianName,
        guardianPhoneNumber,
        relationship,
        schoolTeacherName: store.graduationType === 'CANDIDATE' ? schoolTeacherName : null,
        schoolTeacherPhoneNumber:
          store.graduationType === 'CANDIDATE' ? schoolTeacherPhoneNumber : null,
      });

      const isRelationShipEmpty = !!otherRelationship;

      setIsClickable(
        relationship === '기타 (직접입력)'
          ? validationResult.success && isRelationShipEmpty
          : validationResult.success,
      );
    }

    if (param === '4') {
      return setIsClickable(isStep4Clickable);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param, store.liberalSystem, store.freeSemester, isStep4Clickable, watch()]);

  useEffect(() => {
    if (watch('category') === '검정고시') {
      setValue('schoolName', '검정고시');
      setValue('schoolAddress', '검정고시');
    }
  }, [watch('category')]);

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
    const { img, address, detailAddress } = watch();
    if (img && address && detailAddress) {
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
        setMonth,
        setYear,
      } = store;

      const categoryConvertor: { [key: string]: GraduationType } = {
        졸업자: 'GRADUATE',
        졸업예정: 'CANDIDATE',
        검정고시: 'GED',
      };

      const screeningConvertor: { [key: string]: ScreeningType } = {
        일반전형: 'GENERAL',
        사회통합전형: 'SPECIAL',
        국가보훈대상자: 'EXTRA_VETERANS',
        특례입학대상자: 'EXTRA_ADMISSION',
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
      setMonth(month);
      setYear(year);

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
      otherRelationship,
      category,
    } = watch();

    if (
      guardianName &&
      guardianPhoneNumber &&
      (category === 'CANDIDATE' ? schoolTeacherName && schoolTeacherPhoneNumber : true) &&
      (otherRelationship || relationship)
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
      setRelationshipWithGuardian(
        relationship === '기타 (직접입력)' ? otherRelationship! : relationship!,
      );
      if (category === '졸업예정') {
        setSchoolTeacherName(schoolTeacherName!);
        setSchoolTeacherPhoneNumber(schoolTeacherPhoneNumber!);
      }

      updateStep(Math.min(currentStep + 1, Steps.FOUR));
    }
  };

  const onSubmit: SubmitHandler<basicRegisterType> = () => {
    // eslint-disable-next-line no-console
    const {
      img,
      address,
      detailAddress,
      category,
      schoolName,
      schoolAddress,
      year,
      month,
      screening,
      choice,
      guardianName,
      guardianPhoneNumber,
      relationship,
      otherRelationship,
      schoolTeacherName,
      schoolTeacherPhoneNumber,
    } = watch();

    if (
      img &&
      address &&
      detailAddress &&
      category &&
      schoolName &&
      schoolAddress &&
      year &&
      month &&
      screening &&
      choice &&
      guardianName &&
      guardianPhoneNumber &&
      (category === '졸업예정' ? schoolTeacherName && schoolTeacherPhoneNumber : true) &&
      (otherRelationship || relationship)
    ) {
      const {
        setProfileImg,
        setAddress,
        setDetailAddress,
        setScreening,
        setGuardianName,
        setGuardianPhoneNumber,
        setRelationshipWithGuardian,
        setSchoolTeacherName,
        setSchoolTeacherPhoneNumber,
        setFirstDesiredMajor,
        setSecondDesiredMajor,
        setThirdDesiredMajor,
        setGraduationType,
        setSchoolName,
        setSchoolAddress,
        setMonth,
        setYear,
      } = store;

      const categoryConvertor: { [key: string]: GraduationType } = {
        졸업자: 'GRADUATE',
        졸업예정: 'CANDIDATE',
        검정고시: 'GED',
      };

      const screeningConvertor: { [key: string]: ScreeningType } = {
        일반전형: 'GENERAL',
        사회통합전형: 'SPECIAL',
        국가보훈대상자: 'EXTRA_VETERANS',
        특례입학대상자: 'EXTRA_ADMISSION',
      };

      const majorConvertor: { [key: string]: MajorType } = {
        소프트웨어개발과: 'SW',
        스마트IOT과: 'IOT',
        인공지능과: 'AI',
      };

      setProfileImg(img);
      setAddress(address);
      setDetailAddress(detailAddress);
      setScreening(screeningConvertor[screening]);
      setFirstDesiredMajor(majorConvertor[choice[0]]);
      setSecondDesiredMajor(majorConvertor[choice[1]]);
      setThirdDesiredMajor(majorConvertor[choice[2]]);
      setGraduationType(categoryConvertor[category]);
      setSchoolName(schoolName);
      setSchoolAddress(schoolAddress);
      setGuardianName(guardianName);
      setGuardianPhoneNumber(guardianPhoneNumber);
      setRelationshipWithGuardian(
        relationship === '기타 (직접입력)' ? otherRelationship ?? '' : relationship ?? '',
      );

      if (category === '졸업예정') {
        setSchoolTeacherName(schoolTeacherName!);
        setSchoolTeacherPhoneNumber(schoolTeacherPhoneNumber!);
      }

      setMonth(month);
      setYear(year);
      updateStep(Math.min(currentStep + 1, Steps.FOUR));
      const nextStep = Math.min(currentStep + 1, Steps.FOUR);
      updateStep(nextStep);
    }
  };

  const onError: SubmitErrorHandler<basicRegisterType> = (errors) => {
    // eslint-disable-next-line no-console
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

  const handleCheckScoreButtonClick = () => {
    // console.log(store.scoreForm?.gedTotalScore);

    const middleSchoolAchievement: MiddleSchoolAchievementType | GEDAchievementType =
      store.graduationType === 'GED'
        ? {
            gedTotalScore: store.scoreForm?.gedTotalScore
              ? Number(store.scoreForm.gedTotalScore)
              : 0,
          }
        : {
            liberalSystem: store.liberalSystem === 'freeGrade' ? '자유학년제' : '자유학기제',
            freeSemester: (store.liberalSystem === 'freeSemester'
              ? store.freeSemester
                ? freeSemesterConvertor[store.freeSemester]
                : ''
              : null) as FreeSemesterType,
            artsPhysicalSubjects: ['체육', '음악', '미술'],
            achievement1_2:
              store.freeSemester !== 'achievement1_2' && store.scoreForm?.achievement1_2
                ? store.scoreForm.achievement1_2.map((score) => Number(score))
                : null,
            achievement2_1:
              store.freeSemester !== 'achievement2_1' && store.scoreForm?.achievement2_1
                ? store.scoreForm.achievement2_1.map((score) => Number(score))
                : null,
            achievement2_2:
              store.freeSemester !== 'achievement2_2' && store.scoreForm?.achievement2_2
                ? store.scoreForm.achievement2_2.map((score) => Number(score))
                : null,
            achievement3_1:
              store.freeSemester !== 'achievement3_1' && store.scoreForm?.achievement3_1
                ? store.scoreForm?.achievement3_1.map((score) => Number(score))
                : null,
            achievement3_2:
              store.graduationType === 'GRADUATE' &&
              store.scoreForm?.achievement3_2 &&
              store.freeSemester !== 'achievement3_1'
                ? store.scoreForm.achievement3_2.map((score) => Number(score))
                : null,
            newSubjects: store.scoreForm!.newSubjects,
            artsPhysicalAchievement:
              store.graduationType === 'GRADUATE'
                ? store.scoreForm!.artsPhysicalAchievement!.map((score) => Number(score))
                : store
                    .scoreForm!.artsPhysicalAchievement!.filter((_, idx) => idx < 9)
                    .map((score) => Number(score)),
            absentDays: store.scoreForm!.absentDays!.map((score) => Number(score)),
            attendanceDays: store.scoreForm!.attendanceDays!.map((score) => Number(score)),
            volunteerTime: store.scoreForm!.volunteerTime!.map((score) => Number(score)),
          };

    postMockScore(middleSchoolAchievement);
  };

  return (
    <>
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

          {currentStep === Steps.FOUR ? (
            <Button
              variant={isClickable ? 'next' : 'submit'}
              disabled={!isClickable}
              onClick={handleCheckScoreButtonClick}
            >
              점수 확인하기
            </Button>
          ) : (
            <Button
              variant={isClickable ? 'next' : 'submit'}
              disabled={!isClickable}
              onClick={handleNext}
            >
              다음으로
            </Button>
          )}
        </div>
      </div>
      <ScoreCalculateDialog
        isDialog={isDialog}
        setIsDialog={setIsDialog}
        scoreCalculateDialogData={scoreCalculateDialogData!}
        type="score"
      />
    </>
  );
};

export default StepBar;
