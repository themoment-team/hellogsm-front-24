// import { plusAll } from 'shared';
import { GetMyOneseoType, SexEnum } from 'types';

import { OneseoStatus } from 'client/components';

import { PrintIcon } from 'shared/assets';
import { Button } from 'shared/components';

import { useGetMyOneseo } from 'api/hooks';

interface PrintPageProps {
  initialData: GetMyOneseoType;
}

const ApplicationPage = ({ initialData }: PrintPageProps) => {
  const { data: oneseo } = useGetMyOneseo({ initialData: initialData });

  if (!oneseo) return <>원서 정보가 없습니다</>;

  // const isGEDScore = !!oneseo.middleSchoolAchievement.gedTotalScore;

  // const conversionDays =
  //   !isGEDScore &&
  //   oneseo.middleSchoolAchievement &&
  //   30 - plusAll(oneseo.middleSchoolAchievement.attendanceDays) / 3;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            header,
            footer {
              display: none !important;
            }
          }
        }
      `}</style>
      {/* 입학원서 */}
      <Button
        className="fixed items-center gap-2 bottom-10 right-10 print:hidden"
        onClick={handlePrint}
      >
        <PrintIcon />
        <p className="text-[2.1vh] font-bold hover:text-white">인쇄하기</p>
      </Button>
      <div className="flex h-screen justify-center overflow-hidden bg-white p-2 text-[1vh]">
        <div className="relative z-[1] w-[63vh]">
          <div className="absolute z-[-1] rotate-[-30deg] select-none text-center text-[40vh] text-gray-200">
            견본
          </div>
          <p>[서식 1]</p>
          <div className="text-center text-[3vh] font-bold">
            광주소프트웨어마이스터고등학교 입학원서
          </div>
          <div className="flex items-end justify-between">
            <div className="mt-[1.5vh] text-[1.2vh] font-bold leading-[2vh]">
              2024학년도 신입생 입학전형
            </div>
          </div>
          <div className="border border-black">
            <table className="w-full border-collapse text-center text-[1.2vh]">
              <thead>
                <tr>
                  <th className="w-[3%]" rowSpan={7}>
                    인적사항
                  </th>
                </tr>
                <tr>
                  <th className="w-[3%]" rowSpan={3}>
                    지원자
                  </th>
                  <th>성 명</th>
                  <td>{oneseo.privacyDetail.name}</td>
                  <th className="w-[3%]">성별</th>
                  <td>{SexEnum[oneseo.privacyDetail.sex ?? 'MALE']}</td>
                  <th>생년월일</th>
                  <td>{oneseo.privacyDetail.birth}</td>
                  <td
                    rowSpan={6}
                    className="h-[25vh] w-[18vh]"
                    style={{
                      backgroundImage: `url(${oneseo.privacyDetail.profileImg})`,
                      backgroundSize: '18vh 25vh',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></td>
                </tr>
                <tr>
                  <th>주 소</th>
                  <td colSpan={5}>{oneseo.privacyDetail.address}</td>
                </tr>
                <tr>
                  <th>연락처</th>
                  {/* <th>집전화</th>
                  {oneseo.privacyDetail.phoneNumber ? (
                    <td colSpan={1}>{oneseo.privacyDetail.phoneNumber}</td>
                  ) : (
                    <td colSpan={2} className="line-through"></td>
                  )} */}
                  <th>핸드폰</th>
                  <td>{oneseo.privacyDetail.phoneNumber}</td>
                </tr>
                <tr>
                  <th className="w-[3%]" rowSpan={2}>
                    보호자
                  </th>
                  <th>성 명</th>
                  <td colSpan={2}>{oneseo.privacyDetail.guardianName}</td>
                  <th>지원자와의 관계</th>
                  <td colSpan={2}>{oneseo.privacyDetail.relationshipWithGuardian}</td>
                </tr>
                <tr>
                  <th>핸드폰</th>
                  <td colSpan={5}>{oneseo.privacyDetail.guardianPhoneNumber}</td>
                </tr>
                <tr>
                  <th colSpan={3}>
                    원서작성자(담임) <br /> 성명
                  </th>
                  {oneseo.privacyDetail.schoolTeacherName ? (
                    <td colSpan={2} className="text-end">
                      {oneseo.privacyDetail.schoolTeacherName}(인)
                    </td>
                  ) : (
                    <td colSpan={2} className="line-through"></td>
                  )}
                  <th>핸드폰</th>
                  {oneseo.privacyDetail.schoolTeacherPhoneNumber ? (
                    <td>{oneseo.privacyDetail.schoolTeacherPhoneNumber}</td>
                  ) : (
                    <td className="line-through"></td>
                  )}
                </tr>
              </thead>
            </table>
            <OneseoStatus oneseo={oneseo} />
            <div className="p-2">
              <div className="mb-4">
                위 학생은 2024학년도 귀교 제1학년에 입학하고자 소정의 서류를 갖추어 지원하며, &nbsp;
                <strong>다른 산업수요맞춤형(마이스터)고등학교에 이중지원하지 않을 것을 서약</strong>
                합니다.
              </div>
              <div className="flex justify-center mb-4">
                <p className="mr-2">년</p>
                <p className="mr-2">월</p>
                <p>일</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>지원자 :</p>
                <p className="text-end">(인)</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>보호자 :</p>
                <p className="text-end">(인)</p>
              </div>
              <div className="mb-4 text-center">광주소프트웨어마이스터고등학교장 귀하</div>
              <div className="mb-4 text-center">위 기재 사항이 사실과 같음을 확인합니다.</div>
              <div className="mb-4 text-center">중학교장[직인]</div>
            </div>
          </div>
          <div className="my-4 text-center">2차 전형 응시 준비물 : 신분증[학생증], 필기구 등</div>
        </div>
      </div>
      {/* {!isGEDScore && (
        <div className="flex h-screen justify-center overflow-hidden bg-white p-2 text-[1vh]">
          <div className="relative z-[1] w-[63vh]">
            <div className="absolute z-[-1] rotate-[-30deg] select-none text-center text-[40vh] text-gray-200">
              견본
            </div>
            <p>[서식 2]</p>
            <div className="text-center text-[3vh] font-bold">
              2024학년도 광주소프트웨어마이스터고등학교 성적산출표
            </div>
            <table className="w-full border-collapse text-center text-[1.2vh]">
              <thead>
                <tr>
                  <th>학기</th>
                  {['1학년 1학기', '1학년 2학기', '2학년 1학기', '2학년 2학기', '3학년 1학기'].map(
                    (semester, index) => (
                      <th key={index} className="w-[10vh]">
                        {semester}
                      </th>
                    ),
                  )}
                  <th>합계</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th rowSpan={2}>교과성적</th>
                  {achievementGradeValues
                    .map((gradeKey) => oneseo.middleSchoolAchievement[gradeKey])
                    .map((score, index) => (
                      <td key={index} className="text-[2.5vh] font-bold">
                        {score?.[0] || '-'}
                      </td>
                    ))}
                  <td className="text-[2.5vh] font-bold">{score1_1?.[1] || '-'}</td>
                </tr>
                <tr>
                  <th>교과외활동</th>
                  {[absentScore, attendanceScore, volunteerScore].map((score, index) => (
                    <td key={index} colSpan={2} className="text-[2.5vh] font-bold">
                      {score?.reduce((a, b) => a + b, 0) || '-'}
                    </td>
                  ))}
                  <td className="text-[2.5vh] font-bold">
                    {(absentScore?.reduce((a, b) => a + b, 0) || 0) +
                      (attendanceScore?.reduce((a, b) => a + b, 0) || 0) +
                      (volunteerScore?.reduce((a, b) => a + b, 0) || 0)}
                  </td>
                </tr>
                <tr>
                  <th colSpan={6}>특기사항</th>
                </tr>
                <tr>
                  <td colSpan={6}>
                    {subjects?.map((subject, index) => (
                      <div key={index} className="mb-2">
                        {subject}
                      </div>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )} */}
    </>
  );
};

export default ApplicationPage;
