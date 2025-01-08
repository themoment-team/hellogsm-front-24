/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  GetMyOneseoType,
  GraduationTypeValueEnum,
  LiberalSystemValueEnum,
  MyMemberInfoType,
  PostOneseoType,
  RelationshipWithGuardianValueEnum,
  Step1FormType,
  Step2FormType,
  Step3FormType,
  Step4FormType,
  StepEnum,
} from 'types';

import {
  ConfirmBar,
  EditBar,
  Step1Register,
  Step2Register,
  Step3Register,
  Step4Register,
  StepBar,
} from 'shared/components';
import { ARTS_PHYSICAL_SUBJECTS, GENERAL_SUBJECTS } from 'shared/constants';
import { cn } from 'shared/lib/utils';
import { step1Schema, step2Schema, step3Schema, step4Schema } from 'shared/schemas';

import { usePostMyOneseo, usePostTempStorage, usePutOneseoByMemberId } from 'api/hooks';

interface StepWrapperProps {
  data: GetMyOneseoType | undefined;
  info?: MyMemberInfoType;
  step: StepEnum;
  memberId?: number;
  type: 'client' | 'admin';
}

const step1Url = '/register?step=1';
const step2Url = '/register?step=2';
const step3Url = '/register?step=3';

const StepWrapper = ({ data, step, info, memberId, type }: StepWrapperProps) => {
  const step1UseForm = useForm<Step1FormType>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      profileImg: data?.privacyDetail.profileImg,
      address: data?.privacyDetail.address,
      detailAddress: data?.privacyDetail.detailAddress,
    },
  });

  const step2UseForm = useForm<Step2FormType>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      graduationType: data?.privacyDetail.graduationType,
      schoolName: data?.privacyDetail.schoolName,
      schoolAddress: data?.privacyDetail.schoolAddress,
      graduationDate: data?.privacyDetail.graduationDate || '0000-00',
      screening: data?.wantedScreening,
      firstDesiredMajor: data?.desiredMajors.firstDesiredMajor,
      secondDesiredMajor: data?.desiredMajors.secondDesiredMajor,
      thirdDesiredMajor: data?.desiredMajors.thirdDesiredMajor,
    },
  });

  const step3UseForm = useForm<Step3FormType>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      guardianName: data?.privacyDetail.guardianName,
      guardianPhoneNumber: data?.privacyDetail.guardianPhoneNumber,
      relationshipWithGuardian:
        data?.privacyDetail.relationshipWithGuardian === RelationshipWithGuardianValueEnum.FATHER ||
        data?.privacyDetail.relationshipWithGuardian === RelationshipWithGuardianValueEnum.MOTHER
          ? data?.privacyDetail.relationshipWithGuardian
          : RelationshipWithGuardianValueEnum.OTHER,
      otherRelationshipWithGuardian:
        data?.privacyDetail.relationshipWithGuardian === RelationshipWithGuardianValueEnum.OTHER
          ? data?.privacyDetail.relationshipWithGuardian
          : null,
      schoolTeacherName: data?.privacyDetail.schoolTeacherName,
      schoolTeacherPhoneNumber: data?.privacyDetail.schoolTeacherPhoneNumber,
    },
  });

  const step4UseForm = useForm<Step4FormType>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      liberalSystem:
        data?.middleSchoolAchievement.liberalSystem || LiberalSystemValueEnum.FREE_GRADE,
      achievement1_2: data?.middleSchoolAchievement.achievement1_2,
      achievement2_1: data?.middleSchoolAchievement.achievement2_1,
      achievement2_2: data?.middleSchoolAchievement.achievement2_2,
      achievement3_1: data?.middleSchoolAchievement.achievement3_1,
      achievement3_2: data?.middleSchoolAchievement.achievement3_2,
      newSubjects: data?.middleSchoolAchievement.newSubjects,
      artsPhysicalAchievement: data?.middleSchoolAchievement.artsPhysicalAchievement,
      absentDays: data?.middleSchoolAchievement.absentDays,
      attendanceDays: data?.middleSchoolAchievement.attendanceDays,
      volunteerTime: data?.middleSchoolAchievement.volunteerTime,
      freeSemester: data?.middleSchoolAchievement.freeSemester,
      gedTotalScore: data?.middleSchoolAchievement.gedTotalScore,
    },
  });

  const { push } = useRouter();
  const graduationType = step2UseForm.watch('graduationType');

  const isClient = type === 'client';
  const isCandidate = graduationType === GraduationTypeValueEnum.CANDIDATE;
  const isGraduate = graduationType === GraduationTypeValueEnum.GRADUATE;
  const isGED = graduationType === GraduationTypeValueEnum.GED;
  const isStep4 = step === StepEnum.FOUR;

  const name = isClient ? info!.name : data!.privacyDetail.name;
  const birth = isClient ? info!.birth : data!.privacyDetail.birth;
  const sex = isClient ? info!.sex : data!.privacyDetail.sex;
  const phoneNumber = isClient ? info!.phoneNumber : data!.privacyDetail.phoneNumber;

  const isStepSuccess = {
    '1': step1Schema.safeParse(step1UseForm.watch()).success,
    '2': step2Schema.safeParse(step2UseForm.watch()).success,
    '3': step3Schema.safeParse(step3UseForm.watch()).success,
    '4': step4Schema.safeParse(step4UseForm.watch()).success,
  };

  const { mutate: postMyOneseo } = usePostMyOneseo({});

  const { mutate: putOneseoByMemberId } = usePutOneseoByMemberId(memberId!, {});

  const { mutate: postTempStorage } = usePostTempStorage(Number(step), {});

  const getOneseo = (isTemp: boolean = false) => {
    const { profileImg, address, detailAddress } = step1UseForm.watch();
    const {
      graduationType,
      schoolName,
      schoolAddress,
      graduationDate,
      screening,
      firstDesiredMajor,
      secondDesiredMajor,
      thirdDesiredMajor,
    } = step2UseForm.watch();
    const {
      guardianName,
      guardianPhoneNumber,
      relationshipWithGuardian,
      otherRelationshipWithGuardian,
      schoolTeacherName,
      schoolTeacherPhoneNumber,
    } = step3UseForm.watch();
    const {
      liberalSystem,
      achievement1_2,
      achievement2_1,
      achievement2_2,
      achievement3_1,
      achievement3_2,
      newSubjects,
      artsPhysicalAchievement,
      absentDays,
      attendanceDays,
      volunteerTime,
      freeSemester,
      gedTotalScore,
    } = step4UseForm.watch();

    const body: PostOneseoType = {
      // step 1
      profileImg: profileImg,
      address: address,
      detailAddress: detailAddress,

      // step 2
      graduationType: graduationType,
      schoolName: schoolName,
      schoolAddress: schoolAddress,
      graduationDate: graduationDate,
      screening: screening,
      firstDesiredMajor: firstDesiredMajor,
      secondDesiredMajor: secondDesiredMajor,
      thirdDesiredMajor: thirdDesiredMajor,

      // step 3
      guardianName: guardianName,
      guardianPhoneNumber: guardianPhoneNumber,
      relationshipWithGuardian:
        relationshipWithGuardian === RelationshipWithGuardianValueEnum.OTHER
          ? otherRelationshipWithGuardian
          : relationshipWithGuardian,
      schoolTeacherName: schoolTeacherName,
      schoolTeacherPhoneNumber: schoolTeacherPhoneNumber,

      // step 4
      middleSchoolAchievement: isGED
        ? {
            gedTotalScore: gedTotalScore!,
          }
        : {
            liberalSystem: liberalSystem,
            achievement1_2: achievement1_2!,
            achievement2_1: achievement2_1!,
            achievement2_2: achievement2_2!,
            achievement3_1: achievement3_1!,
            achievement3_2: achievement3_2!,
            newSubjects: newSubjects,
            artsPhysicalAchievement: artsPhysicalAchievement!,
            absentDays: absentDays!,
            attendanceDays: attendanceDays!,
            volunteerTime: volunteerTime!,
            freeSemester: freeSemester,
            generalSubjects: [...GENERAL_SUBJECTS],
            artsPhysicalSubjects: [...ARTS_PHYSICAL_SUBJECTS],
          },

      step: isTemp ? Number(step) : undefined,
    };

    return body;
  };

  const handleOneseoSubmitButtonClick = () => {
    const body = getOneseo();

    postMyOneseo(body);
  };

  const handleTemporarySaveButtonClick = () => {
    const body = getOneseo(true);

    postTempStorage(body);
  };

  const handleOneseoEditButtonClick = () => {
    const body = getOneseo();

    putOneseoByMemberId(body);
  };

  useEffect(() => {
    if (step === StepEnum.TWO && !isStepSuccess[1]) push(step1Url);

    if (step === StepEnum.THREE && (!isStepSuccess[1] || !isStepSuccess[2])) push(step2Url);

    if (step === StepEnum.FOUR && (!isStepSuccess[1] || !isStepSuccess[2] || !isStepSuccess[3]))
      push(step3Url);
  }, [step]);

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
        <div
          className={cn([
            'w-[66.5rem]',
            'flex',
            'flex-col',
            'bg-white',
            'rounded-[1.25rem]',
            'rounded-b-lg-[1.125rem]',
          ])}
        >
          <StepBar step={step} isStepSuccess={isStepSuccess} />
          <div
            className={cn([
              'flex',
              'justify-center',
              'w-full',
              'h-fit',
              'px-[2rem]',
              'py-[1.5rem]',
              'bg-white',
              'rounded-b-lg-[1.125rem]',
            ])}
          >
            {step === '1' && (
              <Step1Register
                {...step1UseForm}
                name={name}
                birth={birth}
                sex={sex}
                phoneNumber={phoneNumber}
              />
            )}
            {step === '2' && <Step2Register {...step2UseForm} />}
            {step === '3' && <Step3Register {...step3UseForm} isCandidate={isCandidate} />}
            {step === '4' && (
              <Step4Register
                {...step4UseForm}
                graduationType={graduationType}
                isGED={isGED}
                isCandidate={isCandidate}
                isGraduate={isGraduate}
              />
            )}
          </div>
        </div>
      </div>

      {isClient ? (
        <ConfirmBar
          isStep4Success={isStepSuccess[4]}
          isStep4={isStep4}
          handleOneseoSubmitButtonClick={handleOneseoSubmitButtonClick}
          handleTemporarySaveButtonClick={handleTemporarySaveButtonClick}
        />
      ) : (
        <EditBar
          isStep4={isStep4}
          isStep4Success={isStepSuccess[4]}
          handleOneseoEditButtonClick={handleOneseoEditButtonClick}
        />
      )}
    </>
  );
};

export default StepWrapper;
