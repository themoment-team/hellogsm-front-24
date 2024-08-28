/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { basicRegisterType, GetMyOneseoType, MyMemberInfoType, PostOneseoType } from 'types';

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
  info: MyMemberInfoType;
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

const getMajorType = (majorTpe: string) => {
  switch (majorTpe) {
    case 'SW':
      return '소프트웨어개발과';
    case 'AI':
      return '인공지능과';
    case 'IOT':
      return '스마트IOT과';
    default:
      return '';
  }
};

const StepsContainer = ({ data, param, info }: Props) => {
  const store = useStore();

  const [scoreWatch, setScoreWatch] = useState<any>(null);
  const [tempBody, setTempBody] = useState<PostOneseoType | null>(null);

  const defaultDetailData = data?.privacyDetail;
  const defaultMajors = data?.desiredMajors;
  const defaultScreening = data?.wantedScreening;

  const relationshipWithGuardian = defaultDetailData?.relationshipWithGuardian || '';
  const isPrimaryRelationship = ['부', '모'].includes(relationshipWithGuardian);

  const sex = info.sex === 'MALE' ? '남자' : '여자';

  const choice = [
    getMajorType(defaultMajors?.firstDesiredMajor || ''),
    getMajorType(defaultMajors?.secondDesiredMajor || ''),
    getMajorType(defaultMajors?.thirdDesiredMajor || ''),
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
    name: info.name,
    birth: info.birth,
    sex: sex,
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
      middleSchoolAchievement.achievement1_1 = scoreWatch('achievement1_1') ?? null;
      middleSchoolAchievement.achievement1_2 = scoreWatch('achievement1_2') ?? null;
      middleSchoolAchievement.achievement2_1 = scoreWatch('achievement2_1') ?? null;
      middleSchoolAchievement.achievement2_2 = scoreWatch('achievement2_2') ?? null;
      middleSchoolAchievement.achievement3_1 = scoreWatch('achievement3_1') ?? null;
      middleSchoolAchievement.newSubjects = scoreWatch('achievement3_1') ?? null;
      middleSchoolAchievement.artsPhysicalAchievement =
        scoreWatch('artsPhysicalAchievement') ?? null;
      middleSchoolAchievement.absentDays = scoreWatch('absentDays') ?? null;
      middleSchoolAchievement.attendanceDays = scoreWatch('attendanceDays') ?? null;
      middleSchoolAchievement.volunteerTime = scoreWatch('volunteerTime') ?? null;
    }

    const tempOneseo = {
      guardianName: watch('guardianName') ? watch('guardianName') : null,
      guardianPhoneNumber: watch('guardianPhoneNumber') ? watch('guardianPhoneNumber') : null,
      relationshipWithGuardian: watch('relationship') ? watch('relationship') : null,
      address: watch('address') ? watch('address') : null,
      detailAddress: watch('detailAddress') ? watch('detailAddress') : null,
      graduationType: getCategoryFromGraduationType(watch('category'))
        ? getCategoryFromGraduationType(watch('category'))
        : null,
      schoolTeacherName: watch('schoolTeacherName') ? watch('schoolTeacherName') : null,
      schoolTeacherPhoneNumber: watch('schoolTeacherPhoneNumber')
        ? watch('schoolTeacherPhoneNumber')
        : null,
      firstDesiredMajor: getMajorTypeText(watch('choice')[0])
        ? getMajorTypeText(watch('choice')[0])
        : null,
      secondDesiredMajor: getMajorTypeText(watch('choice')[1])
        ? getMajorTypeText(watch('choice')[1])
        : null,
      thirdDesiredMajor: getMajorTypeText(watch('choice')[2])
        ? getMajorTypeText(watch('choice')[2])
        : null,
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
