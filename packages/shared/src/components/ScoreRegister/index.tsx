/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @rushstack/no-new-null */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
// import { usePostMyOneseo, usePutOneseo } from 'api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FreeSemesterType, GetMyOneseoType, MiddleSchoolAchievementType } from 'types';

import {
  ArtPhysicalForm,
  EditBar,
  // ArtPhysicalForm,
  // ConfirmBar,
  FormController,
  FreeGradeForm,
  FreeSemesterForm,
  // FreeGradeForm,
  // FreeSemesterForm,
  LiberalSystemSwitch,
  NonSubjectForm,
  // NonSubjectForm,
  // StepBar,
} from 'shared/components';
import { defaultSubjectArray } from 'shared/constants';
import { cn } from 'shared/lib/utils';
import { scoreFormSchema } from 'shared/schemas';

import type { GradesInputMethodType, ScoreFormType, SemesterIdType } from 'types';

const formId = 'scoreForm';

const freeSemesterConvertor = {
  achievement1_1: '1-1',
  achievement1_2: '1-2',
  achievement2_1: '2-1',
  achievement2_2: '2-2',
  achievement3_1: '3-1',
};

const reversedFreeSemesterConvertor: { [key: string]: SemesterIdType } = {
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

interface ScoreRegisterProps {
  data: GetMyOneseoType | undefined;
  type: 'client' | 'admin';
  memberId?: number;
}

const ScoreRegister = ({ data, type, memberId }: ScoreRegisterProps) => {
  const defaultData = data?.middleSchoolAchievement;
  const [liberalSystem, setLiberalSystem] = useState<GradesInputMethodType>(
    defaultData
      ? defaultData.liberalSystem === '자유학년제'
        ? 'freeGrade'
        : 'freeSemester'
      : 'freeGrade',
  );
  const [freeSemester, setFreeSemester] = useState<SemesterIdType | null>(
    defaultData?.freeSemester ? reversedFreeSemesterConvertor[defaultData.freeSemester] : null,
  );
  const [subjectArray, setSubjectArray] = useState<string[]>([...defaultSubjectArray]);
  const defaultSubjectLength = defaultSubjectArray.length;

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
      newSubjects: defaultData?.newSubjects && [...defaultData?.newSubjects],
      absentDays: defaultData?.absentDays && defaultData.absentDays.map((i) => String(i)),
      attendanceDays:
        defaultData?.attendanceDays && defaultData.attendanceDays.map((i) => String(i)),
      volunteerTime: defaultData?.volunteerTime && defaultData.volunteerTime.map((i) => String(i)),
    },
  });

  // const { mutate: mutatePostMyOneseo } = usePostMyOneseo({
  //   onSuccess: () => {},
  //   onError: () => {},
  // });

  // const { mutate: mutatePostOneseo } = usePutOneseo(memberId ?? 0, {
  //   onSuccess: () => {},
  //   onError: () => {},
  // });

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    // if (type === 'client') return mutatePostMyOneseo(body);

    // if (type === 'admin') return mutatePostOneseo(body);
  };

  const handleAddSubjectClick = (defaultSubject?: string) => {
    const newSubject = defaultSubject
      ? defaultSubject
      : `추가과목 ${subjectArray.length - defaultSubjectLength}`;
    setSubjectArray((prev) => [...prev, newSubject]);
  };

  // const handleAddSubjectClick = (newSubjectsLength: number) => {
  //   const newSubject = Array.from(
  //     { length: newSubjectsLength },
  //     (_, index) => `추가과목 ${subjectArray.length - defaultSubjectLength + index}`,
  //   );
  //   setSubjectArray((prev) => [...prev, ...newSubject]);
  // };

  useEffect(() => {
    if (defaultData?.newSubjects?.length) {
      [...defaultData.newSubjects].forEach((subject) => handleAddSubjectClick(subject));
      // handleAddSubjectClick(defaultData.newSubjects.length);

      setTimeout(() => setValue('newSubjects', defaultData.newSubjects), 0);
    }
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
  }, [defaultSubjectLength, freeSemester, liberalSystem, setValue, subjectArray]);

  return (
    <>
      <div
        className={cn([
          'w-full',
          'bg-slate-50',
          'pb-[5rem]',
          'flex',
          'justify-center',
          type === 'client' ? 'pt-[3.56rem]' : 'pt-[8.15rem]',
        ])}
      >
        <div className={cn(['w-[66.5rem]', 'flex', 'flex-col'])}>
          {/* <StepBar /> */}
          <div className={cn(['w-full', 'px-[2rem]', 'py-[1.5rem]', 'bg-white'])}>
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
              성적을 입력해 주세요.
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
              회원가입 시 입력한 기본 정보가 노출됩니다.
            </p>
            <div
              className={cn(
                'flex',
                'h-lvh',
                'justify-center',
                'bg-slate-50',
                'w-full',
                'bg-white',
                'h-fit',
                'gap-[2.5rem]',
              )}
            >
              <FormController className={cn(['mt-[5.625rem]'])} />
              <form
                id={formId}
                onSubmit={handleSubmit(handleFormSubmit)}
                className={cn('flex', 'flex-col', 'items-center')}
              >
                <LiberalSystemSwitch
                  liberalSystem={liberalSystem}
                  setLiberalSystem={setLiberalSystem}
                  className={cn('mb-[3rem]')}
                />
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
                  <div className={cn(...formWrapper)}>
                    예체능 교과 성적
                    <ArtPhysicalForm
                      setValue={setValue}
                      control={control}
                      liberalSystem={liberalSystem}
                    />
                  </div>
                  <div className={cn(...formWrapper)}>
                    비교과 내용
                    <NonSubjectForm register={register} liberalSystem={liberalSystem} />
                  </div>

                  {/* <button
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
        </button> */}
                </div>
              </form>
              {/* {type === 'client' && <ConfirmBar />} */}
              {type === 'admin' && <EditBar id={formId} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreRegister;