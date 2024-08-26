'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { basicRegisterType, GetMyOneseoType } from 'types';

import {
  ApplyRegister,
  BasicRegister,
  ConfirmBar,
  GuardianRegister,
  StepBar,
} from 'shared/components';
import { cn } from 'shared/lib/utils';
import { basicRegisterSchema } from 'shared/schemas';

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
    default:
      return '';
  }
};

const StepsContianer = ({ data, param }: Props) => {
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
        ])}
      >
        <div className={cn(['w-[66.5rem]', 'flex', 'flex-col', 'bg-white'])}>
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
          </div>
        </div>
      </div>
      <ConfirmBar />
    </>
  );
};

export default StepsContianer;
