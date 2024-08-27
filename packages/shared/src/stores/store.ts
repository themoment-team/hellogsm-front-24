import { GraduationType, MajorType, ScreeningType } from 'types';
import { create } from 'zustand';

interface StoreType {
  guardianName: string | undefined;
  guardianPhoneNumber: string | undefined;
  relationshipWithGuardian: string | undefined;
  profileImg: string | undefined;
  address: string | undefined;
  detailAddress: string | undefined;
  graduationType: GraduationType | undefined;
  schoolTeacherName: string | undefined;
  schoolTeacherPhoneNumber: string | undefined;
  firstDesiredMajor: MajorType | undefined;
  secondDesiredMajor: MajorType | undefined;
  thirdDesiredMajor: MajorType | undefined;
  schoolName: string | undefined;
  schoolAddress: string | undefined;
  screening: ScreeningType | undefined;
  setGuardianName: (guardianName: string) => void;
  setGuardianPhoneNumber: (guardianPhoneNumber: string) => void;
  setRelationshipWithGuardian: (relationship: string) => void;
  setProfileImg: (img: string) => void;
  setAddress: (address: string) => void;
  setDetailAddress: (detail: string) => void;
  setGraduationType: (type: GraduationType) => void;
  setSchoolTeacherName: (teacherName: string) => void;
  setSchoolTeacherPhoneNumber: (teacherPhoneNumber: string) => void;
  setFirstDesiredMajor: (major: MajorType) => void;
  setSecondDesiredMajor: (major: MajorType) => void;
  setThirdDesiredMajor: (major: MajorType) => void;
  setSchoolName: (schoolNmae: string) => void;
  setSchoolAddress: (SchoolAddress: string) => void;
  setScreening: (screening: ScreeningType) => void;
}

const useStore = create<StoreType>((set) => ({
  guardianName: undefined,
  guardianPhoneNumber: undefined,
  relationshipWithGuardian: undefined,
  profileImg: undefined,
  address: undefined,
  detailAddress: undefined,
  graduationType: undefined,
  schoolTeacherName: undefined,
  schoolTeacherPhoneNumber: undefined,
  firstDesiredMajor: undefined,
  secondDesiredMajor: undefined,
  thirdDesiredMajor: undefined,
  schoolName: undefined,
  schoolAddress: undefined,
  screening: undefined,
  setGuardianName: (guardianName) => set(() => ({ guardianName: guardianName })),
  setGuardianPhoneNumber: (guardianPhoneNumber) =>
    set(() => ({ guardianPhoneNumber: guardianPhoneNumber })),
  setRelationshipWithGuardian: (relationship) =>
    set(() => ({ relationshipWithGuardian: relationship })),
  setProfileImg: (img) => set(() => ({ profileImg: img })),
  setAddress: (address) => set(() => ({ address: address })),
  setDetailAddress: (detail) => set(() => ({ detailAddress: detail })),
  setGraduationType: (type) => set(() => ({ graduationType: type })),
  setSchoolTeacherName: (teacherName) => set(() => ({ schoolTeacherName: teacherName })),
  setSchoolTeacherPhoneNumber: (teacherPhoneNumber) =>
    set(() => ({ schoolTeacherPhoneNumber: teacherPhoneNumber })),
  setFirstDesiredMajor: (major) => set(() => ({ firstDesiredMajor: major })),
  setSecondDesiredMajor: (major) => set(() => ({ secondDesiredMajor: major })),
  setThirdDesiredMajor: (major) => set(() => ({ thirdDesiredMajor: major })),
  setSchoolName: (schoolNmae) => set(() => ({ schoolName: schoolNmae })),
  setSchoolAddress: (SchoolAddress) => set(() => ({ schoolAddress: SchoolAddress })),
  setScreening: (screening) => set(() => ({ screening: screening })),
}));

export default useStore;
