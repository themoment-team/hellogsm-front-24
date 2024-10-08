/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePostImage, usePostTempStorage } from 'api';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  basicRegisterType,
  GetMyOneseoType,
  MyMemberInfoType,
  SexEnum,
  PostOneseoType,
} from 'types';

import { CloseIcon, InfoIcon } from 'shared/assets';
import {
  ApplyRegister,
  BasicRegister,
  ConfirmBar,
  EditBar,
  GuardianRegister,
  ScoreRegister,
  StepBar,
} from 'shared/components';
import { cn } from 'shared/lib/utils';
import { basicRegisterSchema } from 'shared/schemas';
import { useStore } from 'shared/stores';
import { dataUrltoFile } from 'shared/utils';

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

const ReverseGraduationTypeConvertor: { [key: string]: string } = {
  졸업예정: 'CANDIDATE',
  졸업자: 'GRADUATE',
  검정고시: 'GED',
};

const getScreeningTypeText = (screeningType: string) => {
  switch (screeningType) {
    case 'GENERAL':
      return '일반전형';
    case 'SPECIAL':
      return '사회통합전형';
    case 'EXTRA_VETERANS':
      return '국가보훈대상자';
    case 'EXTRA_ADMISSION':
      return '특례입학대상자';
    case '일반전형':
      return 'GENERAL';
    case '사회통합전형':
      return 'SPECIAL';
    case '국가보훈대상자':
      return 'EXTRA_VETERANS';
    case '특례입학대상자':
      return 'EXTRA_ADMISSION';
    default:
      return '';
  }
};

const getApplyMajor = (applyType: string) => {
  switch (applyType) {
    case 'SW':
      return '소프트웨어개발과';
    case 'AI':
      return '인공지능과';
    case 'IOT':
      return '스마트IOT과';
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

const StepsContainer = ({ data, param, info, memberId, type }: Props) => {
  const { push } = useRouter();
  const [tempBody, setTempBody] = useState<PostOneseoType | null>(null);
  const [isStep4Clickable, setIsStep4Clickable] = useState<boolean>(false);
  const [isButtonClick, setIsButtonClick] = useState<boolean>(false);

  const defaultDetailData = data?.privacyDetail;
  const defaultMajors = data?.desiredMajors;
  const defaultScreening = data?.wantedScreening;

  const relationshipWithGuardian = defaultDetailData?.relationshipWithGuardian || '';
  const isPrimaryRelationship = ['부', '모'].includes(relationshipWithGuardian);
  const store = useStore();

  const sex = info ? SexEnum[info.sex] : '';

  const { mutate: postTempStorage } = usePostTempStorage(Number(param), {
    onSuccess: () =>
      toast.success('임시 저장 되었습니다.', {
        icon: InfoIcon,
        closeButton: (
          <button className="cursor" onClick={() => toast.dismiss()}>
            <CloseIcon />
          </button>
        ),
      }),
    onError: () => toast.error('임시 저장을 실패하였습니다.'),
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

  const choices = [
    defaultMajors?.firstDesiredMajor ? ReverseMajorConvertor[defaultMajors.firstDesiredMajor] : '',
    defaultMajors?.secondDesiredMajor
      ? ReverseMajorConvertor[defaultMajors.secondDesiredMajor]
      : '',
    defaultMajors?.thirdDesiredMajor ? ReverseMajorConvertor[defaultMajors.thirdDesiredMajor] : '',
  ];

  const defaultYear = defaultDetailData?.graduationDate
    ? defaultDetailData.graduationDate.split('-')[0]
    : '';
  const defaultMonth = defaultDetailData?.graduationDate
    ? defaultDetailData.graduationDate.split('-')[1]
    : '';

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
      year: defaultYear || '',
      month: defaultMonth && String(Number(defaultMonth)),
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

  const temporarySave = () => {
    const reverseLiberalSystemConvertor = {
      freeSemester: '자유학기제',
      freeGrade: '자유학년제',
    };

    const freeSemesterConvertor = {
      achievement1_2: '1-2',
      achievement2_1: '2-1',
      achievement2_2: '2-2',
      achievement3_1: '3-1',
      achievement3_2: '3-2',
    } as const;

    const middleSchoolAchievement: { [key: string]: any } = {
      liberalSystem: store.liberalSystem
        ? reverseLiberalSystemConvertor[store.liberalSystem]
        : null,
      freeSemester: store.freeSemester ? freeSemesterConvertor[store.freeSemester] : null,
      artsPhysicalSubjects: ['체육', '음악', '미술'],
      achievement1_2: store.scoreForm?.achievement1_2?.map((value) => Number(value)) ?? null,
      achievement2_1: store.scoreForm?.achievement2_1?.map((value) => Number(value)) ?? null,
      achievement2_2: store.scoreForm?.achievement2_2?.map((value) => Number(value)) ?? null,
      achievement3_1: store.scoreForm?.achievement3_1?.map((value) => Number(value)) ?? null,
      achievement3_2: store.scoreForm?.achievement3_2?.map((value) => Number(value)) ?? null,
      newSubjects: store.scoreForm?.newSubjects ?? null,
      artsPhysicalAchievement:
        store.scoreForm?.artsPhysicalAchievement?.map((value) => Number(value)) ?? null,
      absentDays: store.scoreForm?.absentDays?.map((value) => Number(value)) ?? null,
      attendanceDays: store.scoreForm?.attendanceDays?.map((value) => Number(value)) ?? null,
      volunteerTime: store.scoreForm?.volunteerTime?.map((value) => Number(value)) ?? null,
      gedTotalScore: store.scoreForm?.gedTotalScore ? Number(store.scoreForm?.gedTotalScore) : null,
    };

    const tempOneseo = {
      guardianName: watch('guardianName') ? watch('guardianName') : null,
      guardianPhoneNumber: watch('guardianPhoneNumber') ? watch('guardianPhoneNumber') : null,
      relationshipWithGuardian:
        watch('relationship') === '기타 (직접입력)'
          ? watch('otherRelationship')
          : watch('relationship'),
      address: watch('address') ? watch('address') : null,
      detailAddress: watch('detailAddress') ? watch('detailAddress') : null,
      graduationType: watch('category') ? ReverseGraduationTypeConvertor[watch('category')] : null,
      schoolTeacherName: watch('schoolTeacherName') ? watch('schoolTeacherName') : null,
      schoolTeacherPhoneNumber: watch('schoolTeacherPhoneNumber')
        ? watch('schoolTeacherPhoneNumber')
        : null,
      firstDesiredMajor: watch('choice')[0] ? getApplyMajor(watch('choice')[0]) : null,
      secondDesiredMajor: watch('choice')[1] ? getApplyMajor(watch('choice')[1]) : null,
      thirdDesiredMajor: watch('choice')[2] ? getApplyMajor(watch('choice')[2]) : null,
      middleSchoolAchievement: middleSchoolAchievement,
      schoolName: watch('schoolName') ? watch('schoolName') : null,
      schoolAddress: watch('schoolAddress') ? watch('schoolAddress') : null,
      graduationDate:
        watch('year') && watch('month')
          ? `${watch('year')}-${watch('month').padStart(2, '0')}`
          : null,
      screening: getScreeningTypeText(watch('screening'))
        ? getScreeningTypeText(watch('screening'))
        : null,
      step: Number(param),
    } as PostOneseoType;
    setIsButtonClick(false);

    if (store?.profileImg && store.profileImg.includes('data:image')) {
      const formData = new FormData();
      formData.append('file', dataUrltoFile(watch('img'), 'img.png'));

      setTempBody(tempOneseo);
      mutatePostImage(formData);

      return;
    }

    if (store?.profileImg && !store.profileImg.includes('data:image')) {
      tempOneseo.profileImg = store.profileImg;
    }
    postTempStorage(tempOneseo);
  };

  // const {
  //   img,
  //   address,
  //   detailAddress,
  //   category,
  //   schoolName,
  //   year,
  //   month,
  //   screening,
  //   choice,
  //   guardianName,
  //   guardianPhoneNumber,
  //   relationship,
  //   schoolTeacherName,
  //   schoolTeacherPhoneNumber,
  // } = watch();

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

  // const isBasicInfoComplete = !img || !address || !detailAddress;

  // const isApplyInfoComplete = !category || !schoolName || !year || !month || !screening || !choice;

  // const isGuardianInfoComplete =
  //   !guardianName || !guardianPhoneNumber || !relationship || category === 'CANDIDATE'
  //     ? !schoolTeacherName || !schoolTeacherPhoneNumber
  //     : false;

  const isBasicInfoComplete = !store.profileImg || !store.address || !store.detailAddress;

  const isApplyInfoComplete =
    !store.schoolName ||
    !store.schoolAddress ||
    !store.year ||
    !store.month ||
    !store.screening ||
    !store.graduationType ||
    !store.firstDesiredMajor ||
    !store.secondDesiredMajor ||
    !store.thirdDesiredMajor;

  const isGuardianInfoComplete =
    !store.guardianName ||
    !store.guardianPhoneNumber ||
    !store.relationshipWithGuardian ||
    (store.graduationType === 'CANDIDATE'
      ? !store.schoolTeacherName || !store.schoolTeacherPhoneNumber
      : false);

  useEffect(() => {
    const baseRoute = memberId ? `/edit/${memberId}` : '/register';

    if (param === '2' && isBasicInfoComplete) {
      push(`${baseRoute}?step=1`);
      return;
    }

    if (param === '3') {
      if (isBasicInfoComplete) {
        push(`${baseRoute}?step=1`);
        return;
      }
      if (isApplyInfoComplete) {
        push(`${baseRoute}?step=2`);
        return;
      }
    }

    if (param === '4') {
      if (isBasicInfoComplete) {
        push(`${baseRoute}?step=1`);
        return;
      }
      if (isApplyInfoComplete) {
        push(`${baseRoute}?step=2`);
        return;
      }
      if (isGuardianInfoComplete) {
        push(`${baseRoute}?step=3`);
        return;
      }
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
          'sm:flex',
          'hidden',
          'justify-center',
          'pb-[5rem]',
        ])}
      >
        <div className={cn(['w-[66.5rem]', 'flex', 'flex-col', 'bg-white', 'rounded-[1.25rem]'])}>
          <StepBar
            param={param}
            handleSubmit={handleSubmit}
            watch={watch}
            isStep4Clickable={isStep4Clickable}
            setIsButtonClick={setIsButtonClick}
            setValue={setValue}
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
                data={data}
                memberId={memberId}
                isStep4Clickable={isStep4Clickable}
                setIsStep4Clickable={setIsStep4Clickable}
                isButtonClick={isButtonClick}
              />
            )}
          </div>
        </div>
      </div>

      {type === 'admin' ? (
        <EditBar id="scoreForm" step={param} />
      ) : (
        <ConfirmBar
          temporarySave={temporarySave}
          id="scoreForm"
          isStep4Clickable={isStep4Clickable}
        />
      )}
    </>
  );
};

export default StepsContainer;
