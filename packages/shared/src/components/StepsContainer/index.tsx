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
  ScoreFormType,
} from 'types';

import {
  ApplyRegister,
  BasicRegister,
  EditBar,
  GuardianRegister,
  ScoreRegister,
  StepBar,
} from 'shared/components';
import { cn } from 'shared/lib/utils';
import { basicRegisterSchema } from 'shared/schemas';

interface Props {
  data: GetMyOneseoType | undefined;
  info?: MyMemberInfoType;
  param: string;
  memberId?: number;
  type: 'client' | 'admin';
}

const GraduationTypeConvertor: { [key: string]: string } = {
  CANDIDATE: '졸업예정',
  GRADUATE: '졸업자',
  GED: '검정고시',
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

const StepsContainer = ({ data, param, info, memberId, type }: Props) => {
  const { push } = useRouter();
  const [scoreWatch, setScoreWatch] = useState<ScoreFormType | null>(null);
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

  const adminBasicInfo = {
    name: data?.privacyDetail.name,
    birth: data?.privacyDetail.birth,
    sex: data?.privacyDetail.sex,
    phoneNumber: data?.privacyDetail.phoneNumber,
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
                name={type === 'client' ? userBasicInfo.name : adminBasicInfo.name!}
                birth={type === 'client' ? userBasicInfo.birth : adminBasicInfo.birth!}
                sex={type === 'client' ? userBasicInfo.sex : SexEnum[adminBasicInfo.sex!]}
                phoneNumber={
                  type === 'client' ? userBasicInfo.phoneNumber : adminBasicInfo.phoneNumber!
                }
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
                type={type}
                setScoreWatch={setScoreWatch}
                scoreWatch={scoreWatch}
                data={data}
                memberId={memberId}
                isStep4Checkable={isStep4Checkable}
                setIsStep4Checkable={setIsStep4Checkable}
              />
            )}
          </div>
        </div>
      </div>
      <EditBar id="scoreForm" />
    </>
  );
};

export default StepsContainer;
