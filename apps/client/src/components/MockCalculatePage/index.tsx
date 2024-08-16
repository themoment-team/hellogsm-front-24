/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @rushstack/no-new-null */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FreeSemesterType, GetMyOneseoType, MiddleSchoolAchievementType } from 'types';

import {
  ArtPhysicalForm,
  FreeGradeForm,
  FreeSemesterForm,
  LiberalSystemSwitch,
  NonSubjectForm,
} from 'client/components';
import { defaultSubjectArray } from 'client/constants';
import { cn } from 'client/lib/utils';
import { scoreFormSchema } from 'client/schemas';
import type { GradesInputMethodType, ScoreFormType, SemesterIdType } from 'client/types';

import { usePostMockScore } from 'api/hooks';

const freeSemesterConvertor = {
  achievement1_1: '1-1',
  achievement1_2: '1-2',
  achievement2_1: '2-1',
  achievement2_2: '2-2',
  achievement3_1: '3-1',
};

const reversedFreeSemesterConvertor = {
  '1-1': 'achievement1_1',
  '1-2': 'achievement1_2',
  '2-1': 'achievement2_1',
  '2-2': 'achievement2_2',
  '3-1': 'achievement3_1',
};

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

const MockCalculatePage = ({ data }: { data: GetMyOneseoType | null }) => {
  const [liberalSystem, setLiberalSystem] = useState<GradesInputMethodType>('freeGrade');
  const [freeSemester, setFreeSemester] = useState<SemesterIdType | null>(null);
  const [subjectArray, setSubjectArray] = useState<string[]>([...defaultSubjectArray]);
  const defaultSubjectLength = defaultSubjectArray.length;
  const defaultData = data?.middleSchoolAchievement;

  const { register, handleSubmit, setValue, unregister, watch, control } = useForm<ScoreFormType>({
    resolver: zodResolver(scoreFormSchema),
    defaultValues: {
      achievement1_1:
        defaultData?.achievement1_1 && defaultData.achievement1_1.map((i) => String(i)),
      achievement1_2:
        defaultData?.achievement1_2 && defaultData.achievement1_2.map((i) => String(i)),
      achievement2_1:
        defaultData?.achievement2_1 && defaultData.achievement2_1.map((i) => String(i)),
      achievement2_2:
        defaultData?.achievement2_2 && defaultData.achievement2_2.map((i) => String(i)),
      achievement3_1:
        defaultData?.achievement3_1 && defaultData.achievement3_1.map((i) => String(i)),
      artsPhysicalAchievement:
        defaultData?.artsPhysicalAchievement &&
        defaultData.artsPhysicalAchievement.map((i) => String(i)),
      newSubjects: defaultData?.newSubjects && defaultData?.newSubjects,
      absentDays: defaultData?.absentDays && defaultData.absentDays.map((i) => String(i)),
      attendanceDays:
        defaultData?.attendanceDays && defaultData.attendanceDays.map((i) => String(i)),
      volunteerTime: defaultData?.volunteerTime && defaultData.volunteerTime.map((i) => String(i)),
    },
  });

  const { mutate: mutatePostMockScore } = usePostMockScore('CANDIDATE', {
    onSuccess: (data) => console.log(data),
  });

  const handleDeleteSubjectClick = (idx: number) => {
    const filteredSubjects = subjectArray.filter((_, i) => i !== idx);
    unregister(`newSubjects.${idx - defaultSubjectLength}`);
    setSubjectArray(filteredSubjects);

    const newSubjects = watch('newSubjects');
    const score1_1 = watch('achievement1_1');
    const score1_2 = watch('achievement1_2');
    const score2_1 = watch('achievement2_1');
    const score2_2 = watch('achievement2_2');
    const score3_1 = watch('achievement3_1');
    setValue(
      'newSubjects',
      newSubjects && newSubjects.filter((_, i) => idx - defaultSubjectLength !== i),
    ); // newSubjects 배열에서 인덱스가 N인 값 제거
    setValue('achievement1_1', score1_1 && score1_1.filter((_, i) => i !== idx)); // score1_1 배열에서 인덱스가 기본과목.length + index인 값 제거 (삭제 버튼 클릭한 인덱스 제거)
    setValue('achievement1_2', score1_2 && score1_2.filter((_, i) => i !== idx));
    setValue('achievement2_1', score2_1 && score2_1.filter((_, i) => i !== idx));
    setValue('achievement2_2', score2_2 && score2_2.filter((_, i) => i !== idx));
    setValue('achievement3_1', score3_1 && score3_1.filter((_, i) => i !== idx));
  };

  const handleFormSubmit: SubmitHandler<ScoreFormType> = (data) => {
    if (liberalSystem === 'freeSemester' && !freeSemester) return;

    const isFreeSemester = liberalSystem === 'freeSemester';

    if (isFreeSemester && freeSemester !== null) {
      data[freeSemester] = null;
    }

    const {
      achievement1_1,
      achievement1_2,
      achievement2_1,
      achievement2_2,
      achievement3_1,
      artsPhysicalAchievement,
      absentDays,
      attendanceDays,
      volunteerTime,
      newSubjects,
    } = data;

    const body: MiddleSchoolAchievementType = {
      achievement1_1: achievement1_1 ? achievement1_1.map((i) => Number(i)) : null,
      achievement1_2: achievement1_2 ? achievement1_2.map((i) => Number(i)) : null,
      achievement2_1: achievement2_1 ? achievement2_1.map((i) => Number(i)) : null,
      achievement2_2: achievement2_2 ? achievement2_2.map((i) => Number(i)) : null,
      achievement3_1: achievement3_1 ? achievement3_1.map((i) => Number(i)) : null,
      artsPhysicalAchievement: artsPhysicalAchievement.map((i) => Number(i)),
      absentDays: absentDays.map((i) => Number(i)),
      attendanceDays: attendanceDays.map((i) => Number(i)),
      volunteerTime: volunteerTime.map((i) => Number(i)),
      newSubjects: newSubjects,
      liberalSystem: isFreeSemester ? '자유학년제' : '자유학기제',
      freeSemester: (isFreeSemester
        ? freeSemesterConvertor[freeSemester!]
        : null) as FreeSemesterType,
    };

    console.log(body);
    mutatePostMockScore(body);
  };

  const handleAddSubjectClick = () => {
    const newSubject = `추가과목 ${subjectArray.length - defaultSubjectLength}`;
    setSubjectArray((prev) => [...prev, newSubject]);
  };

  useEffect(() => {
    if (defaultData?.liberalSystem === '자유학기제') setLiberalSystem('freeSemester');
    else setLiberalSystem('freeGrade');

    if (defaultData?.newSubjects?.length)
      Array(defaultData.newSubjects.length).forEach(() => handleAddSubjectClick);

    if (defaultData?.freeSemester)
      setFreeSemester(reversedFreeSemesterConvertor[defaultData.freeSemester] as SemesterIdType);
  }, []);

  useEffect(() => {
    if (subjectArray.length <= defaultSubjectLength) {
      setValue('newSubjects', null);
    }

    if (liberalSystem === 'freeGrade') {
      setValue('achievement1_1', null);
      setValue('achievement1_2', null);
    }

    if (freeSemester) {
      setValue(freeSemester, null);
    }

    if (liberalSystem === 'freeSemester' && freeSemester !== 'achievement1_1') {
      subjectArray.forEach((_, i) => setValue(`achievement1_1.${i}`, '성적 선택'));
    }

    if (liberalSystem === 'freeSemester' && freeSemester !== 'achievement1_2') {
      subjectArray.forEach((_, i) => setValue(`achievement1_2.${i}`, '성적 선택'));
    }
  }, [defaultSubjectLength, freeSemester, liberalSystem, setValue, subjectArray]);

  return (
    <div
      className={cn(
        'flex',
        'h-lvh',
        'justify-center',
        'bg-slate-50',
        'overflow-y-scroll',
        'pt-[120px]',
      )}
    >
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={cn('flex', 'flex-col', 'items-center', 'bg-white')}
      >
        <LiberalSystemSwitch liberalSystem={liberalSystem} setLiberalSystem={setLiberalSystem} />
        <div
          className={cn(
            'flex',
            'flex-col',
            'gap-[2.5rem]',
            'items-center',
            liberalSystem === 'freeGrade' ? 'w-[35.4375rem]' : 'w-[43.4375rem]',
          )}
        >
          <div className={cn(...formWrapper)}>
            일반교과 성적
            {liberalSystem === 'freeGrade' && (
              <FreeGradeForm
                register={register}
                setValue={setValue}
                subjectArray={subjectArray}
                control={control}
                handleDeleteSubjectClick={handleDeleteSubjectClick}
              />
            )}
            {liberalSystem === 'freeSemester' && (
              <FreeSemesterForm
                register={register}
                setValue={setValue}
                subjectArray={subjectArray}
                control={control}
                handleDeleteSubjectClick={handleDeleteSubjectClick}
                freeSemester={freeSemester}
                setFreeSemester={setFreeSemester}
              />
            )}
            <button
              type="button"
              onClick={handleAddSubjectClick}
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
          <div className={cn(...formWrapper)}>
            예체능 교과 성적
            <ArtPhysicalForm setValue={setValue} control={control} liberalSystem={liberalSystem} />
          </div>
          <div className={cn(...formWrapper)}>
            비교과 내용
            <NonSubjectForm register={register} liberalSystem={liberalSystem} />
          </div>

          <button
            type="submit"
            className={cn(
              'pointer',
              'mt-[100px]',
              'select-none',
              'rounded-[10px]',
              'border',
              'border-[#0F0921]',
              'px-[87.5px]',
              'py-[10px]',
              'text-[28px]/[40.54px]',
              'font-[700]',
              'text-[#0F0921]',
              'bg-white',
            )}
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default MockCalculatePage;
