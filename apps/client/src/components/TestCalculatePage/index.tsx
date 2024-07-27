/* eslint-disable @typescript-eslint/naming-convention */
'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SquareIcon } from 'client/assets';
import { FreeGradeForm, FreeSemesterForm } from 'client/components';
import { defaultSubjectArray } from 'client/constants';
import { cn } from 'client/lib/utils';
import { scoreFormSchema } from 'client/schemas';
import type { GradesInputMethodType, ScoreFormType, SemesterIdType } from 'client/types';

const TestCalculatePage = () => {
  const [gradesInputMethod, setGradeInputMethod] = useState<GradesInputMethodType>('freeGrade');
  const [freeSemester, setFreeSemester] = useState<SemesterIdType | null>(null);
  const [subjectArray, setSubjectArray] = useState<string[]>([...defaultSubjectArray]);
  const defaultSubjectLength = defaultSubjectArray.length;

  const { register, handleSubmit, setValue, unregister, watch } = useForm<ScoreFormType>({
    resolver: zodResolver(scoreFormSchema),
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

  const handleDeleteSubjectClick = (deleteSubject: string, idx: number) => {
    const filteredSubjects = subjectArray.filter((subject) => subject !== deleteSubject);
    unregister(`newSubjects.${idx - defaultSubjectLength}`);
    setSubjectArray(filteredSubjects);

    const newSubjects = watch('newSubjects');
    const score1_1 = watch('score1_1');
    const score1_2 = watch('score1_2');
    const score2_1 = watch('score2_1');
    const score2_2 = watch('score2_2');
    const score3_1 = watch('score3_1');
    setValue(
      'newSubjects',
      newSubjects && newSubjects.filter((_, i) => idx - defaultSubjectLength !== i),
    ); // newSubjects 배열에서 인덱스가 N인 값 제거
    setValue('score1_1', score1_1 && score1_1.filter((_, i) => i !== idx)); // score1_1 배열에서 인덱스가 기본과목.length + index인 값 제거 (삭제 버튼 클릭한 인덱스 제거)
    setValue('score1_2', score1_2 && score1_2.filter((_, i) => i !== idx));
    setValue('score2_1', score2_1 && score2_1.filter((_, i) => i !== idx));
    setValue('score2_2', score2_2 && score2_2.filter((_, i) => i !== idx));
    setValue('score3_1', score3_1 && score3_1.filter((_, i) => i !== idx));
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

  const handleFormSubmit: SubmitHandler<ScoreFormType> = (data) => {
    const body = {
      ...data,
      freeSemester: gradesInputMethod === 'freeSemester' ? freeSemester : null,
    };

    console.log(body);
  };

  const handleAddSubjectClick = () => {
    const newSubject = `추가과목 ${subjectArray.length - 7}`;
    setSubjectArray((prev) => [...prev, newSubject]);
  };

  useEffect(() => {
    if (subjectArray.length <= 8) {
      setValue('newSubjects', null);
    }

    if (gradesInputMethod === 'freeGrade') {
      setValue('score1_1', null);
      setValue('score1_2', null);
    }

    if (gradesInputMethod === 'freeSemester' && freeSemester === null) {
      subjectArray.forEach((_, i) => setValue(`score1_1.${i}`, '선택'));
      subjectArray.forEach((_, i) => setValue(`score1_2.${i}`, '선택'));
    }

    if (gradesInputMethod === 'freeSemester' && freeSemester !== null) {
      setValue(freeSemester, null);
    }
  }, [freeSemester, gradesInputMethod, setValue, subjectArray]);

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
                idx < 8 ? (
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
                      onClick={() => handleDeleteSubjectClick(subject, idx)}
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
            'w-full',
            'mt-[12px]',
            'rounded-[6px]',
            'h-[37px]',
            'min-h-[37px]',
          )}
        >
          +과목추가
        </button>
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

export default TestCalculatePage;
