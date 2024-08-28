'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { basicRegisterType, GetMyOneseoType } from 'types';

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

import { usePostTempStorage } from 'api/hooks';

interface Props {
  data: GetMyOneseoType | undefined;
  param: string;
}

const getCategoryFromGraduationType = (graduationType: string) => {
  switch (graduationType) {
    case 'CANDIDATE':
      return '졸업예정';
    case 'GRADUATE':
      return '졸업자';
    case 'GED':
      return '검정고시';
    case '졸업예정':
      return 'CANDIDATE';
    case '졸업자':
      return 'GRADUATE';
    case '검정고시':
      return 'GED';
    default:
      return '';
  }
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

const getMajorTypeText = (majorTpe: string) => {
  switch (majorTpe) {
    case '소프트웨어개발과':
      return 'SW';
    case '인공지능과':
      return 'AI';
    case '스마트IOT과':
      return 'IOT';
    default:
      return '';
  }
};

const StepsContainer = ({ data, param }: Props) => {
  const store = useStore();

  const [scoreWatch, setScoreWatch] = useState<any>(null);

  const defaultDetailData = data?.privacyDetail;
  const defaultMajors = data?.desiredMajors;
  const defaultScreening = data?.wantedScreening;

  const relationshipWithGuardian = defaultDetailData?.relationshipWithGuardian || '';
  const isPrimaryRelationship = ['부', '모'].includes(relationshipWithGuardian);

  const sex =
    defaultDetailData?.sex === 'MALE' ? '남자' : defaultDetailData?.sex === 'FEMALE' ? '여자' : '';

  const choice = [
    defaultMajors?.firstDesiredMajor || '',
    defaultMajors?.secondDesiredMajor || '',
    defaultMajors?.thirdDesiredMajor || '',
  ];

  const { register, handleSubmit, setValue, watch } = useForm<basicRegisterType>({
    resolver: zodResolver(basicRegisterSchema),
    defaultValues: {
      img: defaultDetailData?.profileImg || '',
      address: defaultDetailData?.address || '',
      detailAddress: defaultDetailData?.detailAddress || '',
      phoneNumber: defaultDetailData?.phoneNumber || '',
      category: getCategoryFromGraduationType(defaultDetailData?.graduationType || ''),
      schoolName: defaultDetailData?.schoolName || '',
      schoolAddress: defaultDetailData?.schoolAddress || '',
      year: '',
      month: '',
      screening: getScreeningTypeText(defaultScreening || ''),
      choice: choice,
      guardianName: defaultDetailData?.guardianName || '',
      guardianPhoneNumber: defaultDetailData?.guardianPhoneNumber || '',
      relationship: isPrimaryRelationship ? relationshipWithGuardian : '',
      otherRelationship: isPrimaryRelationship ? '' : relationshipWithGuardian,
      schoolTeacherName: defaultDetailData?.schoolTeacherName || '',
      schoolTeacherPhoneNumber: defaultDetailData?.schoolTeacherPhoneNumber || '',
    },
  });

  const userBasicInfo = {
    name: defaultDetailData?.name,
    birth: defaultDetailData?.birth,
    sex: sex,
  };

  const { mutate: postTempStorage } = usePostTempStorage();

  const temporarySave = () => {
    const middleSchoolAchievement = {
      achievement1_1: scoreWatch('achievement1_1') ?? null,
      achievement1_2: scoreWatch('achievement1_2') ?? null,
      achievement2_1: scoreWatch('achievement2_1') ?? null,
      achievement2_2: scoreWatch('achievement2_2') ?? null,
      achievement3_1: scoreWatch('achievement3_1') ?? null,
      newSubjects: scoreWatch('achievement3_1') ?? null,
      artsPhysicalAchievement: scoreWatch('artsPhysicalAchievement') ?? null,
      absentDays: scoreWatch('absentDays') ?? null,
      attendanceDays: scoreWatch('attendanceDays') ?? null,
      volunteerTime: scoreWatch('volunteerTime') ?? null,
      liberalSystem: store.liberalSystem ?? null,
      freeSemester: store.freeSemester ?? null,
      artsPhysicalSubjects: ['체육', '음악', '미술'],
    };

    const tempOneseo = {
      guardianName: watch('guardianName') ?? null,
      guardianPhoneNumber: watch('guardianPhoneNumber') ?? null,
      relationshipWithGuardian: watch('relationship') ?? null,
      profileImg: watch('img') ?? null,
      address: watch('address') ?? null,
      detailAddress: watch('detailAddress') ?? null,
      graduationType: getCategoryFromGraduationType(watch('category')) ?? null,
      schoolTeacherName: watch('schoolTeacherName') ?? null,
      schoolTeacherPhoneNumber: watch('schoolTeacherPhoneNumber') ?? null,
      firstDesiredMajor: getMajorTypeText(watch('choice')[0]) ?? null,
      secondDesiredMajor: getMajorTypeText(watch('choice')[1]) ?? null,
      thirdDesiredMajor: getMajorTypeText(watch('choice')[2]) ?? null,
      middleSchoolAchievement: middleSchoolAchievement,
      schoolName: watch('schoolName') ?? null,
      schoolAddress: watch('schoolAddress') ?? null,
      screening: getScreeningTypeText(watch('screening')) ?? null,
    };

    postTempStorage(tempOneseo);
  };

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
          <StepBar param={param} handleSubmit={handleSubmit} watch={watch} />
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
                register={register}
                setValue={setValue}
                watch={watch}
              />
            )}
            {param === '2' && <ApplyRegister setValue={setValue} watch={watch} />}
            {param === '3' && (
              <GuardianRegister register={register} setValue={setValue} watch={watch} />
            )}
            {param === '4' && <ScoreRegister setScoreWatch={setScoreWatch} data={data} />}
          </div>
        </div>
      </div>
      <ConfirmBar temporarySave={temporarySave} id="scoreForm" />
    </>
  );
};

export default StepsContainer;
