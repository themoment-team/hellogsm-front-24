/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  basicRegisterType,
  GetMyOneseoType,
  MyMemberInfoType,
  SexEnum,
  PostOneseoType,
  ScoreFormType,
} from 'types';

import {
  ApplyRegister,
  BasicRegister,
  ConfirmBar,
  GuardianRegister,
  ScoreRegister,
  StepBar,
} from 'shared/components';
import { cn } from 'shared/lib/utils';
import { basicRegisterSchema } from 'shared/schemas';
import { useStore } from 'shared/stores';
import { dataUrltoFile } from 'shared/utils';

import { usePostImage, usePostTempStorage } from 'api/hooks';

interface Props {
  data: GetMyOneseoType | undefined;
  info: MyMemberInfoType | undefined;
  param: string;
  memberId?: number;
}

const GraduationTypeConvertor: { [key: string]: string } = {
  CANDIDATE: '졸업예정',
  GRADUATE: '졸업자',
  GED: '검정고시',
};

const ReverseGraduationTypeConvertor: { [key: string]: string } = {
  졸업예정: 'CANDIDATE',
  졸업자: 'GRADUATE',
  검정고시: 'GED',
};

const ReverseMajorConvertor: { [key: string]: string } = {
  SW: '소프트웨어개발과',
  AI: '인공지능과',
  IOT: '스마트IOT과',
};

const getScreeningTypeText = (screeningType: string) => {
  switch (screeningType) {
    case 'GENERAL':
      return '일반전형';
    case 'SPECIAL':
      return '특별전형';
    case 'EXTRA_VETERANS':
    case 'EXTRA_ADMISSION':
      return '정원 외 특별전형';
    case '일반전형':
      return 'GENERAL';
    case '특별전형':
      return 'SPECIAL';
    case '정원 외 특별전형':
      return 'EXTRA_ADMISSION';
    default:
      return '';
  }
};

const StepsContainer = ({ data, param, info, memberId }: Props) => {
  const { push } = useRouter();
  const store = useStore();

  const [scoreWatch, setScoreWatch] = useState<ScoreFormType | null>(null);
  const [tempBody, setTempBody] = useState<PostOneseoType | null>(null);
  const [isStep4Checkable, setIsStep4Checkable] = useState<boolean>(false);

  const defaultDetailData = data?.privacyDetail;
  const defaultMajors = data?.desiredMajors;
  const defaultScreening = data?.wantedScreening;

  const relationshipWithGuardian = defaultDetailData?.relationshipWithGuardian || '';
  const isPrimaryRelationship = ['부', '모'].includes(relationshipWithGuardian);

  const sex = info ? SexEnum[info.sex] : '';

  const choices = [
    defaultMajors?.firstDesiredMajor ? ReverseMajorConvertor[defaultMajors.firstDesiredMajor] : '',
    defaultMajors?.secondDesiredMajor
      ? ReverseMajorConvertor[defaultMajors.secondDesiredMajor]
      : '',
    defaultMajors?.thirdDesiredMajor ? ReverseMajorConvertor[defaultMajors.thirdDesiredMajor] : '',
  ];

  const { register, handleSubmit, setValue, watch } = useForm<basicRegisterType>({
    resolver: zodResolver(basicRegisterSchema),
    defaultValues: {
      img: defaultDetailData?.profileImg || '',
      address: defaultDetailData?.address || '',
      detailAddress: defaultDetailData?.detailAddress || '',
      category:
        defaultDetailData?.graduationType &&
        GraduationTypeConvertor[defaultDetailData.graduationType],
      schoolName: defaultDetailData?.schoolName || '',
      schoolAddress: defaultDetailData?.schoolAddress || '',
      year: '',
      month: '',
      screening: getScreeningTypeText(defaultScreening || ''),
      choice: choices,
      guardianName: defaultDetailData?.guardianName || '',
      guardianPhoneNumber: defaultDetailData?.guardianPhoneNumber || '',
      relationship: isPrimaryRelationship ? relationshipWithGuardian : '',
      otherRelationship: isPrimaryRelationship ? '' : relationshipWithGuardian,
      schoolTeacherName: defaultDetailData?.schoolTeacherName || '',
      schoolTeacherPhoneNumber: defaultDetailData?.schoolTeacherPhoneNumber || '',
    },
  });

  const {
    img,
    address,
    detailAddress,
    category,
    schoolName,
    year,
    month,
    screening,
    choice,
    guardianName,
    guardianPhoneNumber,
    relationship,
    schoolTeacherName,
    schoolTeacherPhoneNumber,
  } = watch();

  const userBasicInfo = {
    name: info?.name || '',
    birth: info?.birth || '',
    sex: sex,
    phoneNumber: info?.phoneNumber || '',
  };

  const { mutate: postTempStorage } = usePostTempStorage({
    onSuccess: () => {
      alert('원서 제출 완료');
    },
    onError: () => {},
  });

  const { mutate: mutatePostImage } = usePostImage({
    onSuccess: (data) => {
      if (tempBody) {
        const body: PostOneseoType = { ...tempBody, profileImg: data.url };

        postTempStorage(body);
      }
    },
    onError: () => {},
  });

  const temporarySave = () => {
    const middleSchoolAchievement: { [key: string]: any } = {
      liberalSystem: store.liberalSystem ?? null,
      freeSemester: store.freeSemester ?? null,
      artsPhysicalSubjects: ['체육', '음악', '미술'],
    };

    if (param === '4') {
      if (!scoreWatch) return;

      middleSchoolAchievement.achievement1_1 = scoreWatch.achievement1_1 ?? null;
      middleSchoolAchievement.achievement1_2 = scoreWatch.achievement1_2 ?? null;
      middleSchoolAchievement.achievement2_1 = scoreWatch.achievement2_1 ?? null;
      middleSchoolAchievement.achievement2_2 = scoreWatch.achievement2_2 ?? null;
      middleSchoolAchievement.achievement3_1 = scoreWatch.achievement3_1 ?? null;
      middleSchoolAchievement.newSubjects = scoreWatch.achievement3_1 ?? null;
      middleSchoolAchievement.artsPhysicalAchievement = scoreWatch.artsPhysicalAchievement ?? null;
      middleSchoolAchievement.absentDays = scoreWatch.absentDays ?? null;
      middleSchoolAchievement.attendanceDays = scoreWatch.attendanceDays ?? null;
      middleSchoolAchievement.volunteerTime = scoreWatch.volunteerTime ?? null;
    }

    const tempOneseo = {
      guardianName: watch('guardianName') ? watch('guardianName') : null,
      guardianPhoneNumber: watch('guardianPhoneNumber') ? watch('guardianPhoneNumber') : null,
      relationshipWithGuardian: watch('relationship') ? watch('relationship') : null,
      address: watch('address') ? watch('address') : null,
      detailAddress: watch('detailAddress') ? watch('detailAddress') : null,
      graduationType: watch('category') ? ReverseGraduationTypeConvertor[watch('category')] : null,
      schoolTeacherName: watch('schoolTeacherName') ? watch('schoolTeacherName') : null,
      schoolTeacherPhoneNumber: watch('schoolTeacherPhoneNumber')
        ? watch('schoolTeacherPhoneNumber')
        : null,
      firstDesiredMajor: watch('choice')[0] ? ReverseMajorConvertor[watch('choice')[0]] : null,
      secondDesiredMajor: watch('choice')[1] ? ReverseMajorConvertor[watch('choice')[1]] : null,
      thirdDesiredMajor: watch('choice')[2] ? ReverseMajorConvertor[watch('choice')[2]] : null,
      middleSchoolAchievement: middleSchoolAchievement,
      schoolName: watch('schoolName') ? watch('schoolName') : null,
      schoolAddress: watch('schoolAddress') ? watch('schoolAddress') : null,
      screening: getScreeningTypeText(watch('screening'))
        ? getScreeningTypeText(watch('screening'))
        : null,
      step: Number(param),
    } as PostOneseoType;

    if (watch('img')) {
      const formData = new FormData();
      formData.append('file', dataUrltoFile(watch('img'), 'img.png'));

      setTempBody(tempOneseo);
      mutatePostImage(formData);

      return;
    }

    postTempStorage(tempOneseo);
  };

  const isBasicInfoComplete = !img || !address || !detailAddress;

  const isApplyInfoComplete = !category || !schoolName || !year || !month || !screening || !choice;

  const isGuardianInfoComplete =
    !guardianName ||
    !guardianPhoneNumber ||
    !relationship ||
    !schoolTeacherName ||
    !!schoolTeacherPhoneNumber;

  useEffect(() => {
    const baseRoute = memberId ? `/edit/${memberId}` : '/register';

    if (param === '2' && isBasicInfoComplete) {
      push(`${baseRoute}?step=1`);
      return;
    }
    if (param === '3' && isBasicInfoComplete) {
      push(`${baseRoute}?step=1`);
      if (isApplyInfoComplete) {
        push(`${baseRoute}?step=2`);
        return;
      }
      return;
    }
  }, [isBasicInfoComplete, isApplyInfoComplete, isGuardianInfoComplete, param, push, memberId]);

  return (
    <>
      <div
        className={cn([
          'w-full',
          'h-full',
          'bg-slate-50',
          'pt-[3.56rem]',
          'flex',
          'justify-center',
          'pb-[5rem]',
        ])}
      >
        <div className={cn(['w-[66.5rem]', 'flex', 'flex-col', 'bg-white', 'rounded-[1.25rem]'])}>
          <StepBar
            scoreWatch={scoreWatch!}
            param={param}
            handleSubmit={handleSubmit}
            watch={watch}
            isStep4Checkable={isStep4Checkable}
          />
          <div
            className={cn([
              'flex',
              'justify-center',
              'w-full',
              'h-fit',
              'px-[2rem]',
              'py-[1.5rem]',
              'bg-white',
            ])}
          >
            {param === '1' && (
              <BasicRegister
                name={userBasicInfo.name}
                birth={userBasicInfo.birth}
                sex={userBasicInfo.sex}
                phoneNumber={userBasicInfo.phoneNumber}
                register={register}
                setValue={setValue}
                watch={watch}
              />
            )}
            {param === '2' && <ApplyRegister setValue={setValue} watch={watch} />}
            {param === '3' && (
              <GuardianRegister register={register} setValue={setValue} watch={watch} />
            )}
            {param === '4' && (
              <ScoreRegister
                type="client"
                setScoreWatch={setScoreWatch}
                scoreWatch={scoreWatch}
                data={data}
                isStep4Checkable={isStep4Checkable}
                setIsStep4Checkable={setIsStep4Checkable}
              />
            )}
          </div>
        </div>
      </div>
      <ConfirmBar
        temporarySave={temporarySave}
        id="scoreForm"
        isStep4Checkable={isStep4Checkable}
      />
    </>
  );
};

export default StepsContainer;
