/* eslint-disable @typescript-eslint/naming-convention */
'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePostImage, usePostMyOneseo, usePutOneseoByMemberId, usePostMockScore } from 'api';
// import { usePostMyOneseo, usePutOneseo } from 'api';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FreeSemesterType, GetMyOneseoType, MiddleSchoolAchievementType } from 'types';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  ArtPhysicalForm,
  EditBar,
  FormController,
  FreeGradeForm,
  FreeSemesterForm,
  Input,
  LiberalSystemSwitch,
  NonSubjectForm,
  ScoreCalculateDialog,
} from 'shared/components';
import { defaultSubjectArray } from 'shared/constants';
import { cn } from 'shared/lib/utils';
import { scoreFormSchema } from 'shared/schemas';
import { useStore } from 'shared/stores';
import { dataUrltoFile } from 'shared/utils';

import type {
  GEDAchievementType,
  GradesInputMethodType,
  MockScoreType,
  PostOneseoType,
  ScoreFormType,
  SemesterIdType,
} from 'types';

const formId = 'scoreForm';

const LiberalSystemConvertor: { [key: string]: GradesInputMethodType } = {
  자유학기제: 'freeSemester',
  자유학년제: 'freeGrade',
};

const freeSemesterConvertor = {
  achievement1_2: '1-2',
  achievement2_1: '2-1',
  achievement2_2: '2-2',
  achievement3_1: '3-1',
  achievement3_2: '3-2',
} as const;

const reversedFreeSemesterConvertor: { [key: string]: SemesterIdType } = {
  '1-2': 'achievement1_2',
  '2-1': 'achievement2_1',
  '2-2': 'achievement2_2',
  '3-1': 'achievement3_1',
  '3-2': 'achievement3_2',
} as const;

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

const widthConvertor: { [key: string]: string } = {
  freeGrade_GRADUATION: 'w-[42.9375rem]',
  freeGrade_CANDIDATE: 'w-[35.4375rem]',
  freeSemester_GRADUATIONN: 'w-[43.4375rem]',
  freeSemester_CANDIDATE: 'w-[36.1em]',
};

// ${store.liberalSystem}_${store.graduationType!}

interface ScoreRegisterProps {
  data: GetMyOneseoType | undefined;
  memberId?: number;
  type: 'client' | 'admin' | 'calculate';
  // eslint-disable-next-line @rushstack/no-new-null
  scoreWatch?: ScoreFormType | null;
  isStep4Clickable?: boolean;
  setIsStep4Clickable?: Dispatch<SetStateAction<boolean>>;
  isButtonClick?: boolean;
}

const ScoreRegister = ({
  data,
  memberId,
  type,
  isStep4Clickable,
  setIsStep4Clickable,
  isButtonClick,
}: ScoreRegisterProps) => {
  const store = useStore();
  const { push } = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { setLiberalSystem, setFreeSemester, freeSemester, liberalSystem, setScoreForm } = store;
  const [oneseoBody, setOneseoBody] = useState<Omit<PostOneseoType, 'profileImg'> | null>(null);
  const [subjectArray, setSubjectArray] = useState<string[]>([...defaultSubjectArray]);
  const [scoreCalculateDialogData, setScoreCalculateDialogData] = useState<MockScoreType | null>(
    null,
  );
  const [isDialog, setIsDialog] = useState(false);

  const defaultData = data?.middleSchoolAchievement;
  const defaultSubjectLength = defaultSubjectArray.length;

  const { register, handleSubmit, setValue, unregister, watch, control } = useForm<ScoreFormType>({
    resolver: zodResolver(scoreFormSchema),
    defaultValues: {
      achievement1_2: store.scoreForm?.achievement1_2
        ? store.scoreForm.achievement1_2
        : defaultData?.achievement1_2 && defaultData.achievement1_2.map((i) => String(i)),
      achievement2_1: store.scoreForm?.achievement2_1
        ? store.scoreForm.achievement2_1
        : defaultData?.achievement2_1 && defaultData.achievement2_1.map((i) => String(i)),
      achievement2_2: store.scoreForm?.achievement2_2
        ? store.scoreForm.achievement2_2
        : defaultData?.achievement2_2 && defaultData.achievement2_2.map((i) => String(i)),
      achievement3_1: store.scoreForm?.achievement3_1
        ? store.scoreForm.achievement3_1
        : defaultData?.achievement3_1 && defaultData.achievement3_1.map((i) => String(i)),
      achievement3_2: store.scoreForm?.achievement3_2
        ? store.scoreForm.achievement3_2
        : defaultData?.achievement3_2 && defaultData.achievement3_2.map((i) => String(i)),
      artsPhysicalAchievement: store.scoreForm?.artsPhysicalAchievement
        ? store.scoreForm.artsPhysicalAchievement
        : defaultData?.artsPhysicalAchievement &&
          defaultData.artsPhysicalAchievement.map((i) => String(i)),
      newSubjects: store.scoreForm?.newSubjects
        ? store.scoreForm.newSubjects
        : defaultData?.newSubjects && [...defaultData.newSubjects],
      absentDays: store.scoreForm?.absentDays
        ? store.scoreForm.absentDays
        : defaultData?.absentDays && defaultData.absentDays.map((i) => String(i)),
      attendanceDays: store.scoreForm?.attendanceDays
        ? store.scoreForm.attendanceDays
        : defaultData?.attendanceDays && defaultData.attendanceDays.map((i) => String(i)),
      volunteerTime: store.scoreForm?.volunteerTime
        ? store.scoreForm.volunteerTime
        : defaultData?.volunteerTime && defaultData.volunteerTime.map((i) => String(i)),
      gedTotalScore: store.scoreForm?.gedTotalScore
        ? store.scoreForm.gedTotalScore
        : defaultData?.gedTotalScore
          ? String(defaultData.gedTotalScore)
          : '',
    },
  });

  useEffect(() => {
    if (watch) {
      const { isArray } = Array;

      setScoreForm({
        achievement1_2: isArray(watch('achievement1_2')) ? watch('achievement1_2') : null,
        achievement2_1: isArray(watch('achievement2_1')) ? watch('achievement2_1') : null,
        achievement2_2: isArray(watch('achievement2_2')) ? watch('achievement2_2') : null,
        achievement3_1: isArray(watch('achievement3_1')) ? watch('achievement3_1') : null,
        achievement3_2: isArray(watch('achievement3_2')) ? watch('achievement3_2') : null,
        newSubjects: watch('newSubjects'),
        artsPhysicalAchievement: watch('artsPhysicalAchievement'),
        absentDays: watch('absentDays'),
        attendanceDays: watch('attendanceDays'),
        volunteerTime: watch('volunteerTime'),
        gedTotalScore: watch('gedTotalScore'),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStep4Clickable, isButtonClick]);

  useEffect(() => {
    if (!setIsStep4Clickable) return;

    if (
      (store.graduationType === 'CANDIDATE' || store.graduationType === 'GRADUATE') &&
      scoreFormSchema.safeParse({
        ...watch(),
        ...{
          achievement1_2: liberalSystem === 'freeGrade' ? null : watch('achievement1_2'),
          achievement3_2: store.graduationType === 'CANDIDATE' ? null : watch('achievement3_2'),
          artsPhysicalAchievement:
            store.graduationType === 'CANDIDATE'
              ? watch('artsPhysicalAchievement')?.filter((_, idx) => idx < 9)
              : watch('artsPhysicalAchievement'),
        },
      }).success === true
    ) {
      if (liberalSystem === 'freeSemester') return setIsStep4Clickable!(true);
      else if (liberalSystem === 'freeGrade' && !freeSemester) return setIsStep4Clickable!(true);
    } else if (store.graduationType === 'GED' && Number(watch('gedTotalScore')) > 0)
      return setIsStep4Clickable!(true);
    else return setIsStep4Clickable!(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch()]);

  useEffect(() => {
    if (!freeSemester && defaultData?.freeSemester)
      return setFreeSemester(reversedFreeSemesterConvertor[defaultData.freeSemester]);

    if (liberalSystem === 'freeGrade') return setFreeSemester(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultData, setFreeSemester, liberalSystem]);

  const { mutate: mutatePostMyOneseo } = usePostMyOneseo({
    onSuccess: () => {
      setShowModal(true);
    },
    onError: () => {},
  });

  const { mutate: postMockScore } = usePostMockScore(store.graduationType!, {
    onSuccess: (data) => {
      setScoreCalculateDialogData(data);
      setIsDialog(true);
    },

    onError: () => {},
  });

  const { mutate: mutatePostImage } = usePostImage({
    onSuccess: (data) => {
      if (oneseoBody) {
        const body: PostOneseoType = { ...oneseoBody, profileImg: data.url };

        mutatePostMyOneseo(body);
      }
    },
    onError: () => {},
  });

  const { mutate: mutatePutOneseo } = usePutOneseoByMemberId(memberId!, {
    onSuccess: () => {
      setShowModal(true);
    },
    onError: () => {},
  });

  const handleDeleteSubjectClick = (idx: number) => {
    const filteredSubjects = subjectArray.filter((_, i) => i !== idx);
    unregister(`newSubjects.${idx - defaultSubjectLength}`);
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

  const handleFormSubmit: SubmitHandler<ScoreFormType> = (data) => {
    const {
      guardianName,
      guardianPhoneNumber,
      relationshipWithGuardian,
      profileImg,
      address,
      detailAddress,
      graduationType,
      schoolTeacherName,
      schoolTeacherPhoneNumber,
      firstDesiredMajor,
      secondDesiredMajor,
      thirdDesiredMajor,
      schoolName,
      schoolAddress,
      year,
      month,
      screening,
    } = store;

    const isAllWrite =
      guardianName &&
      guardianPhoneNumber &&
      relationshipWithGuardian &&
      profileImg &&
      address &&
      detailAddress &&
      graduationType &&
      schoolTeacherName &&
      schoolTeacherPhoneNumber &&
      firstDesiredMajor &&
      secondDesiredMajor &&
      thirdDesiredMajor &&
      schoolName &&
      schoolAddress &&
      year &&
      month &&
      liberalSystem &&
      screening;

    console.log(store);

    if (type !== 'calculate' && !isAllWrite) return;

    const isFreeSemester = liberalSystem === 'freeSemester';

    const {
      achievement1_2,
      achievement2_1,
      achievement2_2,
      achievement3_1,
      achievement3_2,
      artsPhysicalAchievement,
      absentDays,
      attendanceDays,
      volunteerTime,
      newSubjects,
      gedTotalScore,
    } = data;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const middleSchoolAchievement: MiddleSchoolAchievementType | GEDAchievementType =
      store.graduationType === 'GED'
        ? { gedTotalScore: Number(gedTotalScore) }
        : {
            achievement1_2: achievement1_2 ? achievement1_2.map((i) => Number(i)) : null,
            achievement2_1: achievement2_1 ? achievement2_1.map((i) => Number(i)) : null,
            achievement2_2: achievement2_2 ? achievement2_2.map((i) => Number(i)) : null,
            achievement3_1: achievement3_1 ? achievement3_1.map((i) => Number(i)) : null,
            achievement3_2: achievement3_2 ? achievement3_2.map((i) => Number(i)) : null,
            artsPhysicalAchievement:
              graduationType === 'GRADUATE'
                ? artsPhysicalAchievement!.map((i) => Number(i))
                : artsPhysicalAchievement!.filter((_, idx) => idx < 9).map((i) => Number(i)),
            absentDays: absentDays!.map((i) => Number(i)),
            attendanceDays: attendanceDays!.map((i) => Number(i)),
            volunteerTime: volunteerTime!.map((i) => Number(i)),
            newSubjects: newSubjects,
            liberalSystem: liberalSystem === 'freeGrade' ? '자유학년제' : '자유학기제',
            freeSemester: (isFreeSemester
              ? freeSemesterConvertor[freeSemester!]
              : null) as FreeSemesterType,
            artsPhysicalSubjects: ['체육', '음악', '미술'],
          };

    if (type === 'calculate') {
      return postMockScore(middleSchoolAchievement);
    }

    const body: PostOneseoType = {
      guardianName: guardianName!,
      guardianPhoneNumber: guardianPhoneNumber!,
      relationshipWithGuardian: relationshipWithGuardian!,
      address: address!,
      detailAddress: detailAddress!,
      graduationType: graduationType!,
      schoolTeacherName: schoolTeacherName!,
      schoolTeacherPhoneNumber: schoolTeacherPhoneNumber!,
      firstDesiredMajor: firstDesiredMajor!,
      secondDesiredMajor: secondDesiredMajor!,
      thirdDesiredMajor: thirdDesiredMajor!,
      schoolName: schoolName!,
      schoolAddress: schoolAddress!,
      graduationDate: `${year}-${month!.toString().padStart(2, '0')}`,
      screening: screening!,
      middleSchoolAchievement: middleSchoolAchievement!,
      profileImg: profileImg,
    };

    if (type === 'admin') {
      const putBody: PostOneseoType = {
        ...body,
        profileImg: profileImg!,
      };

      return mutatePutOneseo(putBody);
    }

    setOneseoBody(body);

    if (profileImg && profileImg.includes('data:image')) {
      const formData = new FormData();
      formData.append('file', dataUrltoFile(profileImg!, 'img.png'));

      return mutatePostImage(formData);
    }

    mutatePostMyOneseo(body);
  };

  const handleAddSubjectClick = (defaultSubject?: string) => {
    const newSubject = defaultSubject
      ? defaultSubject
      : `추가과목 ${subjectArray.length - defaultSubjectLength}`;
    setSubjectArray((prev) => [...prev, newSubject]);
  };

  useEffect(() => {
    if (defaultData?.newSubjects?.length) {
      [...defaultData.newSubjects].forEach((subject) => handleAddSubjectClick(subject));
      // handleAddSubjectClick(defaultData.newSubjects.length);

      setTimeout(() => setValue('newSubjects', defaultData.newSubjects), 0);
    }

    setLiberalSystem(
      store.liberalSystem
        ? store.liberalSystem
        : defaultData?.liberalSystem
          ? LiberalSystemConvertor[defaultData.liberalSystem]
          : 'freeGrade',
    );

    if (store.graduationType === 'GED') {
      setTimeout(() => {
        setValue('absentDays', null);
        setValue('achievement1_2', null);
        setValue('achievement2_1', null);
        setValue('achievement2_2', null);
        setValue('achievement3_1', null);
        setValue('achievement3_2', null);
        setValue('artsPhysicalAchievement', null);
        setValue('attendanceDays', null);
        setValue('newSubjects', null);
        setValue('volunteerTime', null);
      }, 0);
    }

    if (store.graduationType === 'CANDIDATE') {
      setTimeout(() => {
        setValue('achievement3_2', null);
      }, 0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (subjectArray.length <= defaultSubjectLength) {
      setValue('newSubjects', null);
    }
  }, [defaultSubjectLength, freeSemester, liberalSystem, setValue, subjectArray]);

  return (
    <>
      <div className={cn(['w-[66.5rem]', 'px-8', 'flex', 'flex-col', type === 'admin' && 'pb-20'])}>
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
        {store.graduationType === 'GED' ? (
          <form id={formId} onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={cn('w-[18.75rem]', 'flex', 'flex-col', 'gap-1')}>
              <p className={cn('text-slate-900', 'text-[0.875rem]/[1.25rem]')}>
                검정고시 전과목 득점 합계 <span className={cn('text-red-600')}>*</span>
              </p>
              <Input {...register('gedTotalScore')} placeholder="점수 입력" />
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
            <form
              id={formId}
              onSubmit={(e) => {
                e.preventDefault();

                if (liberalSystem === 'freeSemester' && freeSemester) {
                  setValue(freeSemester, null);
                }

                handleSubmit(handleFormSubmit)();
              }}
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
                  widthConvertor[`${store.liberalSystem!}_${store.graduationType!}`],
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
                <div id="artPhysicalSubject" className={cn(...formWrapper)}>
                  예체능 교과 성적
                  <ArtPhysicalForm
                    setValue={setValue}
                    control={control}
                    liberalSystem={liberalSystem}
                  />
                </div>
                <div id="nonSubject" className={cn(...formWrapper)}>
                  비교과 내용
                  <NonSubjectForm register={register} liberalSystem={liberalSystem} />
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      {type === 'admin' && <EditBar id={formId} />}
      <ScoreCalculateDialog
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
                  {
                    // TODO 연락처 수정 필요
                  }
                  문제가 있다면 blabla로 연락주세요.
                </>
              ) : (
                <>원서가 수정되었습니다!</>
              )}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                push(type === 'client' ? '/mypage' : '/');
                setShowModal(false);
              }}
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ScoreRegister;
