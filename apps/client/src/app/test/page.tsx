import { GetMyOneseoType } from 'types';

import { TestCalculatePage } from 'client/components';

// import { getMyOneseo } from 'api/apis';

const Test = async () => {
  // const myOneseo = await getMyOneseo();

  const myOneseo: GetMyOneseoType = {
    oneseoId: 100,
    submitCode: 'A-1',
    wantedScreening: 'GENERAL',
    desiredMajors: {
      firstDesiredMajor: 'AI',
      secondDesiredMajor: 'IOT',
      thirdDesiredMajor: 'SW',
    },
    privacyDetail: {
      name: '최장우',
      sex: 'MALE',
      birth: '2006-03-06',
      phoneNumber: '01050648138',
      graduationType: 'CANDIDATE',
      address: '광주광역시 광산구 송정동 상무대로 312',
      detailAddress: '101동 1001호',
      guardianName: '최장우',
      guardianPhoneNumber: '01050648138',
      relationshipWithGuardian: '모',
      schoolName: '양산중학교',
      schoolAddress: '학교위치',
      schoolTeacherName: '최장우',
      schoolTeacherPhoneNumber: '01050648138',
      profileImg: 'image url',
    },
    middleSchoolAchievement: {
      achievement1_1: [4, 5, 3, 5, 4, 5, 3, 5, 6],
      achievement1_2: [4, 5, 3, 5, 4, 5, 3, 5, 6],
      achievement2_1: [4, 5, 3, 5, 4, 5, 3, 5, 6],
      achievement2_2: [4, 5, 3, 5, 4, 5, 3, 5, 6],
      achievement3_1: [4, 5, 3, 5, 4, 5, 3, 5, 6],
      generalSubjects: ['국어', '도덕', '사회', '역사', '수학', '과학', '기술가정', '영어'],
      newSubjects: ['중국어'],
      artsPhysicalAchievement: [4, 5, 3, 5, 4, 5, 3, 5, 3],
      artsPhysicalSubjects: ['체육', '미술', '음악'],
      absentDays: [4, 5, 3],
      attendanceDays: [4, 5, 3, 5, 4, 5, 3, 5, 8],
      volunteerTime: [4, 5, 3],
      liberalSystem: '자유학기제',
      freeSemester: '2-1',
      gedTotalScore: 100,
    },
    step: 1,
  };

  return <TestCalculatePage data={myOneseo} />;
};

export default Test;
