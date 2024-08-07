/* eslint-disable @typescript-eslint/naming-convention */
'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FreeSemesterType, MiddleSchoolAchievementType } from 'types';

import { SquareIcon } from 'client/assets';
import {
  ArtPhysicalForm,
  FreeGradeForm,
  FreeSemesterForm,
  NonSubjectForm,
} from 'client/components';
import { artPhysicalSubjectArray, defaultSubjectArray, gradeArray } from 'client/constants';
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

const subjectDiv = [
  'flex',
  'w-[100px]',
  'h-[37px]',
  'rounded-[6px]',
  'bg-[#19BAFF]',
  'items-center',
  'justify-center',
  'font-[700]',
  'text-[17px]/[24.62px]',
  'text-[#F8F8F8]',
];

const MockCalculatePage = () => {
  const [gradesInputMethod, setGradeInputMethod] = useState<GradesInputMethodType>('freeGrade');
  const [freeSemester, setFreeSemester] = useState<SemesterIdType | null>(null);
  const [subjectArray, setSubjectArray] = useState<string[]>([...defaultSubjectArray]);
  const defaultSubjectLength = defaultSubjectArray.length;

  const { register, handleSubmit, setValue, unregister, watch } = useForm<ScoreFormType>({
    resolver: zodResolver(scoreFormSchema),
  });

  const { mutate: mutatePostMockScore } = usePostMockScore('CANDIDATE', {
    onSuccess: (data) => console.log(data),
  });

  const gradesInputMethodButton = (type: GradesInputMethodType) => [
    `${gradesInputMethod === type ? 'bg-[#19BAFF]' : 'bg-[#484453]'}`,
    `${gradesInputMethod === type ? 'text-[#ffffff]' : 'text-[#ABA9B1]'}`,
    'w-[140px]',
    'h-[65px]',
    'rounded-[6px]',
    'text-[17px]/[24.62px]',
    'font-[700]',
  ];

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
    if (gradesInputMethod === 'freeSemester' && !freeSemester) return;
    const isFreeSemester = gradesInputMethod === 'freeSemester';

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
    if (subjectArray.length <= defaultSubjectLength) {
      setValue('newSubjects', null);
    }

    if (gradesInputMethod === 'freeGrade') {
      setValue('achievement1_1', null);
      setValue('achievement1_2', null);
    }
    if (gradesInputMethod === 'freeSemester' && freeSemester === null) {
      subjectArray.forEach((_, i) => setValue(`achievement1_1.${i}`, '선택'));
      subjectArray.forEach((_, i) => setValue(`achievement1_2.${i}`, '선택'));
    }

    if (gradesInputMethod === 'freeSemester' && freeSemester !== null) {
      setValue(freeSemester, null);
    }
  }, [defaultSubjectLength, freeSemester, gradesInputMethod, setValue, subjectArray]);

  return (
    <div
      className={cn(
        'flex',
        'h-lvh',
        'justify-center',
        'bg-[#0F0921]',
        'overflow-y-scroll',
        'pt-[120px]',
      )}
    >
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={cn('flex', 'flex-col', 'items-center')}
      >
        <div className={cn('flex', 'gap-6', 'mb-[30px]')}>
          <button
            type="button"
            onClick={() => setGradeInputMethod('freeGrade')}
            className={cn(...gradesInputMethodButton('freeGrade'))}
          >
            자유학년제
          </button>
          <button
            type="button"
            onClick={() => setGradeInputMethod('freeSemester')}
            className={cn(...gradesInputMethodButton('freeSemester'))}
          >
            자유학기제
          </button>
        </div>
        <div className={cn('flex', 'gap-6')}>
          <div className={cn('flex', 'flex-col')}>
            <SquareIcon />
            <div className={cn('mt-[20px]', 'flex', 'flex-col', 'gap-[13px]')}>
              {gradesInputMethod === 'freeSemester' && (
                <div className={cn(...subjectDiv)}>자유학기제</div>
              )}
              {subjectArray.map((subject, idx) =>
                idx < defaultSubjectLength ? (
                  <div className={cn(...subjectDiv)} key={subject}>
                    {subject}
                  </div>
                ) : (
                  <div key={subject} className={cn('relative')}>
                    <input
                      {...register(`newSubjects.${idx - defaultSubjectLength}`)}
                      className={cn(
                        'bg-[#484453]',
                        'w-[100px]',
                        'h-[37px]',
                        'rounded-[6px]',
                        'text-[17px]/[24.62px]',
                        'font-[500]',
                        'text-[#FFFFFF8F]/[0.54]',
                        'flex',
                        'text-center',
                      )}
                      type="text"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteSubjectClick(idx)}
                      className={cn(
                        gradesInputMethod === 'freeGrade' ? 'left-[570px]' : 'left-[870px]',
                        'absolute',
                        'top-1/2',
                        '-translate-y-1/2',
                        'text-red-500',
                        'flex',
                        'w-[28px]',
                      )}
                    >
                      삭제
                    </button>
                  </div>
                ),
              )}
            </div>
          </div>
          {gradesInputMethod === 'freeGrade' && (
            <FreeGradeForm register={register} subjectArray={subjectArray} />
          )}

          {gradesInputMethod === 'freeSemester' && (
            <FreeSemesterForm
              register={register}
              subjectArray={subjectArray}
              freeSemester={freeSemester}
              setFreeSemester={setFreeSemester}
            />
          )}
        </div>
        <button
          type="button"
          onClick={handleAddSubjectClick}
          className={cn(
            'text-[#F8F8F8]',
            'bg-[#0C4680]',
            'mt-[12px]',
            'rounded-[6px]',
            'h-[37px]',
            'min-h-[37px]',
            gradesInputMethod === 'freeGrade' ? 'w-[553px]' : 'w-[855px]',
          )}
        >
          +과목추가
        </button>
        <div className={cn('flex', 'gap-6', 'mt-[50px]')}>
          <div className={cn('flex', 'flex-col')}>
            <SquareIcon />
            <div className={cn('mt-[20px]', 'flex', 'flex-col', 'gap-[13px]')}>
              {artPhysicalSubjectArray.map((subject) => (
                <div className={cn(...subjectDiv)} key={subject}>
                  {subject}
                </div>
              ))}
            </div>
          </div>
          <ArtPhysicalForm register={register} />
        </div>

        <div className={cn('flex', 'gap-6', 'mt-[50px]')}>
          <div className={cn('flex', 'flex-col')}>
            <div className={cn(...subjectDiv, 'h-[55px]')}>학년</div>
            <div className={cn('mt-[20px]', 'flex', 'flex-col', 'gap-[13px]')}>
              {gradeArray.map((subject) => (
                <div className={cn(...subjectDiv)} key={subject}>
                  {subject}
                </div>
              ))}
            </div>
          </div>
          <NonSubjectForm register={register} />
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
      </form>
    </div>
  );
};

export default MockCalculatePage;
