/* eslint-disable @typescript-eslint/naming-convention */
'use client';

import { useEffect, useState } from 'react';

import {
  Control,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormUnregister,
  UseFormWatch,
} from 'react-hook-form';
import { LiberalSystemValueEnum, Step4FormType } from 'types';
import { GraduationTypeValueEnum } from 'types';

import {
  ArtPhysicalForm,
  FormController,
  FreeGradeForm,
  FreeSemesterForm,
  Input,
  LiberalSystemSwitch,
  NonSubjectForm,
} from 'shared/components';
import { GENERAL_SUBJECTS } from 'shared/constants';
import { cn } from 'shared/lib/utils';

const formWrapper = [
  'flex',
  'flex-col',
  'gap-[0.75rem]',
  'text-slate-900',
  'text-lg',
  'font-semibold',
  'leading-7',
  'w-full',
];

const strongStyle = ['text-[0.875rem]/[1.25rem]', 'text-blue-700', 'font-semibold'];

const widthConvertor: { [key: string]: string } = {
  freeGrade_GRADUATION: 'w-[42.9375rem]',
  freeGrade_CANDIDATE: 'w-[35.4375rem]',
  freeSemester_GRADUATION: 'w-[43.4375rem]',
  freeSemester_CANDIDATE: 'w-[36.1em]',
};

// ${store.liberalSystem}_${store.graduationType!}

interface Step4RegisterProps {
  type?: 'client' | 'admin' | 'calculate';
  graduationType: GraduationTypeValueEnum;
  register: UseFormRegister<Step4FormType>;
  unregister: UseFormUnregister<Step4FormType>;
  setValue: UseFormSetValue<Step4FormType>;
  watch: UseFormWatch<Step4FormType>;
  control: Control<Step4FormType>;
  reset: UseFormReset<Step4FormType>;
  isGED: boolean;
  isCandidate: boolean;
  isGraduate: boolean;
}

const Step4Register = ({
  register,
  setValue,
  control,
  watch,
  unregister,
  type,
  reset,
  graduationType,
  isGED,
  isCandidate,
  isGraduate,
}: Step4RegisterProps) => {
  const [subjectArray, setSubjectArray] = useState<string[]>([...GENERAL_SUBJECTS]);
  const defaultSubjectLength = GENERAL_SUBJECTS.length;

  const isCalculate = type === 'calculate';
  const isFreeSemester = watch('liberalSystem') === LiberalSystemValueEnum.FREE_SEMESTER;
  const isFreeGrade = watch('liberalSystem') === LiberalSystemValueEnum.FREE_GRADE;

  const handleDeleteSubjectClick = (idx: number) => {
    const filteredSubjects = subjectArray.filter((_, i) => i !== idx);
    unregister(`newSubjects.${idx - defaultSubjectLength}`);
    unregister(`achievement1_2.${idx}`, undefined);
    unregister(`achievement2_1.${idx}`, undefined);
    unregister(`achievement2_2.${idx}`, undefined);
    unregister(`achievement3_1.${idx}`, undefined);
    unregister(`achievement3_2.${idx}`, undefined);
    setSubjectArray(filteredSubjects);

    const newSubjects = watch('newSubjects');
    const score1_2 = watch('achievement1_2');
    const score2_1 = watch('achievement2_1');
    const score2_2 = watch('achievement2_2');
    const score3_1 = watch('achievement3_1');
    const score3_2 = watch('achievement3_2');

    setValue(
      'newSubjects',
      newSubjects && newSubjects.filter((_, i) => idx - defaultSubjectLength !== i),
    ); // newSubjects 배열에서 인덱스가 N인 값 제거
    setValue('achievement1_2', score1_2 && score1_2.filter((_, i) => i !== idx));
    setValue('achievement2_1', score2_1 && score2_1.filter((_, i) => i !== idx));
    setValue('achievement2_2', score2_2 && score2_2.filter((_, i) => i !== idx));
    setValue('achievement3_1', score3_1 && score3_1.filter((_, i) => i !== idx));
    setValue('achievement3_2', score3_2 && score3_2.filter((_, i) => i !== idx)); // score3_2 배열에서 인덱스가 기본과목.length + index인 값 제거 (삭제 버튼 클릭한 인덱스 제거)
  };

  const handleAddSubjectClick = (subjectName?: string) => {
    const newSubject = subjectName
      ? subjectName
      : `추가과목 ${subjectArray.length - defaultSubjectLength}`;
    setSubjectArray((prev) => [...prev, newSubject]);
  };

  useEffect(() => {
    if (isGED) {
      reset({
        liberalSystem: null,
        achievement1_2: null,
        achievement2_1: null,
        achievement2_2: null,
        achievement3_1: null,
        achievement3_2: null,
        artsPhysicalAchievement: null,
        absentDays: null,
        attendanceDays: null,
        volunteerTime: null,
        freeSemester: null,
      });
    } else {
      reset({
        liberalSystem: watch('liberalSystem') ?? LiberalSystemValueEnum.FREE_GRADE,
        achievement1_2: watch('achievement1_2') ?? undefined,
        achievement2_1: watch('achievement2_1') ?? undefined,
        achievement2_2: watch('achievement2_2') ?? undefined,
        achievement3_1: watch('achievement3_1') ?? undefined,
        achievement3_2: watch('achievement3_2') ?? undefined,
        newSubjects: watch('newSubjects') ?? undefined,
        artsPhysicalAchievement: watch('artsPhysicalAchievement') ?? undefined,
        absentDays: watch('absentDays') ?? undefined,
        attendanceDays: watch('attendanceDays') ?? undefined,
        volunteerTime: watch('volunteerTime') ?? undefined,
        freeSemester: watch('freeSemester') ?? undefined,
        gedTotalScore: null,
      });

      const newSubject = watch('newSubjects');

      if (newSubject && newSubject.length) {
        newSubject.forEach((subjectName) => handleAddSubjectClick(subjectName));
      }
    }
  }, []);

  return (
    <>
      <div className={cn(['w-[66.5rem]', 'flex', 'flex-col', type === 'admin' && 'pb-20'])}>
        <h1
          className={cn([
            'text-[1.25rem]',
            'font-normal',
            'font-semibold',
            'leading-[1.75rem]',
            'tracking-[-0.00625rem]',
            'text-gray-900',
          ])}
        >
          {isCalculate ? '모의 성적 계산하기' : '성적을 입력해 주세요.'}
        </h1>
        <p
          className={cn(
            'text-sm',
            'font-normal',
            'leading-5',
            'text-gray-600',
            'mt-[0.125rem]',
            'mb-[2rem]',
          )}
        >
          {isCalculate
            ? '성적을 정확히 입력해 주세요.'
            : '회원가입 시 입력한 기본 정보가 노출됩니다.'}
        </p>
        {graduationType === GraduationTypeValueEnum.GED ? (
          <form onSubmit={() => {}}>
            <div className={cn('w-[18.75rem]', 'flex', 'flex-col', 'gap-1')}>
              <p className={cn('text-slate-900', 'text-[0.875rem]/[1.25rem]')}>
                검정고시 전과목 득점 합계 <span className={cn('text-red-600')}>*</span>
              </p>
              <Input
                {...register('gedTotalScore', {
                  valueAsNumber: true,
                })}
                placeholder="점수 입력"
              />
            </div>
          </form>
        ) : (
          <div
            className={cn(
              'flex',
              'h-lvh',
              'justify-center',
              'bg-white',
              'w-full',
              'h-fit',
              'gap-[2.5rem]',
            )}
          >
            <FormController className={cn(['mt-[5.625rem]'])} />
            <form className={cn('flex', 'flex-col', 'items-center')}>
              <LiberalSystemSwitch
                isFreeGrade={isFreeGrade}
                isFreeSemester={isFreeSemester}
                setValue={setValue}
                className={cn('mb-[3rem]')}
              />
              <div
                className={cn(
                  'flex',
                  'flex-col',
                  'gap-[2.5rem]',
                  'items-center',
                  widthConvertor[`${watch('liberalSystem')}_${graduationType}`],
                )}
              >
                <div className={cn(...formWrapper)}>
                  <div className={cn('flex', 'justify-between', 'items-center')}>
                    일반교과 성적
                    {isFreeSemester && (
                      <span
                        className={cn('text-[0.875rem]/[1.25rem]', 'text-blue-700', 'font-normal')}
                      >
                        1학년 1학기에 <strong className={cn(strongStyle)}>자유학기제</strong>{' '}
                        이셨다면, <strong className={cn(strongStyle)}>자유학기제</strong> 선택을 안
                        해도 됩니다.
                      </span>
                    )}
                  </div>
                  {isFreeGrade && (
                    <FreeGradeForm
                      register={register}
                      setValue={setValue}
                      subjectArray={subjectArray}
                      watch={watch}
                      control={control}
                      handleDeleteSubjectClick={handleDeleteSubjectClick}
                      isCandidate={isCandidate}
                    />
                  )}
                  {isFreeSemester && (
                    <FreeSemesterForm
                      register={register}
                      setValue={setValue}
                      subjectArray={subjectArray}
                      watch={watch}
                      handleDeleteSubjectClick={handleDeleteSubjectClick}
                      isCandidate={isCandidate}
                      freeSemester={watch('freeSemester')}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => handleAddSubjectClick()}
                    className={cn(
                      'text-sm',
                      'font-semibold',
                      'leading-6',
                      'text-[#0F172A]',
                      'h-[2.5rem]',
                      'w-full',
                      'flex',
                      'items-center',
                      'justify-center',
                      'rounded-md',
                      'border-[0.0625rem]',
                      'border-slate-200',
                    )}
                  >
                    + 과목 추가하기
                  </button>
                </div>
                <div id="artPhysicalSubject" className={cn(...formWrapper)}>
                  예체능 교과 성적
                  <ArtPhysicalForm
                    graduationType={graduationType}
                    setValue={setValue}
                    control={control}
                    isFreeGrade={isFreeGrade}
                    freeSemester={watch('freeSemester')}
                  />
                </div>
                <div id="nonSubject" className={cn(...formWrapper)}>
                  <div className={cn('w-full', 'flex', 'justify-between')}>
                    비교과 내용
                    <div
                      className={cn(
                        'flex',
                        'items-center',
                        'justify-center',
                        'gap-1',
                        'text-red-500',
                        'text-[0.75rem]/[1.25rem]',
                        'font-semibold',
                      )}
                    >
                      <p>*</p>
                      <p>미인정 결석, 지각, 조퇴, 결과 횟수만 입력</p>
                    </div>
                  </div>
                  <NonSubjectForm
                    register={register}
                    isFreeGrade={isFreeGrade}
                    isGraduate={isGraduate}
                  />
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      {/* <ScoreCalculateDialog
        isDialog={isDialog}
        setIsDialog={setIsDialog}
        scoreCalculateDialogData={scoreCalculateDialogData}
        type="mock"
      />
      <AlertDialog open={showModal}>
        <AlertDialogContent className="w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {type === 'client' ? (
                <>
                  원서가 제출되었습니다!
                  <br />
                  문제가 있다면
                  <br />
                  062-949-6800(교무실)로 연락주세요.
                </>
              ) : (
                <>원서가 수정되었습니다!</>
              )}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>
              <Link
                href={type === 'client' ? '/mypage' : '/'}
                onClick={() => {
                  setShowModal(false);
                  if (type === 'client') refetch();
                }}
              >
                확인
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
};

export default Step4Register;
