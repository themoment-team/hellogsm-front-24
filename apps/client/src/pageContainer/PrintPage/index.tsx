import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import toStringArray from 'utils/Array/toStringArray';
import { formatGender } from 'utils/Format';

import { ApplicantsStatus } from 'client/components';

import { ApplicationDataType } from 'types/application';
import { isGED } from 'types/ged';
import { LocalScoreType } from 'types/score';

const ApplicationPage = ({ data }: ApplicationDataType) => {
  const [score1_1, setScore1_1] = useState<string[] | undefined>([]);
  const [score1_2, setScore1_2] = useState<string[] | undefined>([]);
  const [score2_1, setScore2_1] = useState<string[] | undefined>([]);
  const [score2_2, setScore2_2] = useState<string[] | undefined>([]);
  const [score3_1, setScore3_1] = useState<string[] | undefined>([]);
  const [artSportsScore, setArtSportsScore] = useState<string[]>([]);
  const [absentScore, setAbsentScore] = useState<number[]>([]);
  const [attendanceScore, setAttendanceScore] = useState<number[]>([]);
  const [volunteerScore, setVolunteerScore] = useState<number[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [newSubjects, setNewSubjects] = useState<string[]>([]);
  const [nonSubjects, setNonSubjects] = useState<string[]>([]);

  const { admissionGrade, middleSchoolGrade, admissionInfo } = data || {};

  useEffect(() => {
    const scoreData: LocalScoreType | null = middleSchoolGrade
      ? JSON.parse(middleSchoolGrade)
      : null;
    setScore1_1(toStringArray(scoreData?.score1_1));
    setScore1_2(toStringArray(scoreData?.score1_2));
    setScore2_1(toStringArray(scoreData?.score2_1));
    setScore2_2(toStringArray(scoreData?.score2_2));
    setScore3_1(toStringArray(scoreData?.score3_1));
    setArtSportsScore(toStringArray(scoreData?.artSportsScore) || []);
    setAbsentScore(scoreData?.absentScore || []);
    setAttendanceScore(scoreData?.attendanceScore || []);
    setVolunteerScore(scoreData?.volunteerScore || []);
    setSubjects(scoreData?.subjects || []);
    setNewSubjects(scoreData?.newSubjects || []);
    setNonSubjects(scoreData?.nonSubjects || []);
  }, [middleSchoolGrade]);

  const isGEDScore = isGED(admissionGrade);

  const conversionDays = !isGEDScore && admissionGrade && 30 - admissionGrade?.attendanceScore / 3;

  const userBirth = admissionInfo && new Date(admissionInfo?.applicantBirth);
  const Formatbirth =
    userBirth &&
    dayjs()
      .set('year', userBirth.getFullYear())
      .set('month', userBirth.getMonth())
      .set('date', userBirth.getDate())
      .format('YYYY-MM-DD');

  const TryPrint = () => {
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
                  <td>{admissionInfo?.applicantName}</td>
                  <th className="w-[3%]">성별</th>
                  <td>{formatGender(admissionInfo?.applicantGender)}</td>
                  <th>생년월일</th>
                  <td>{Formatbirth}</td>
                  <td
                    rowSpan={6}
                    className="h-[25vh] w-[18vh]"
                    style={{
                      backgroundImage: `url(${admissionInfo?.applicantImageUri})`,
                      backgroundSize: '18vh 25vh',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></td>
                </tr>
                <tr>
                  <th>주 소</th>
                  <td colSpan={5}>{admissionInfo?.address}</td>
                </tr>
                <tr>
                  <th>연락처</th>
                  <th>집전화</th>
                  {admissionInfo?.telephone ? (
                    <td colSpan={2}>{admissionInfo?.telephone}</td>
                  ) : (
                    <td colSpan={2} className="line-through"></td>
                  )}
                  <th>핸드폰</th>
                  <td>{admissionInfo?.applicantPhoneNumber}</td>
                </tr>
                <tr>
                  <th className="w-[3%]" rowSpan={2}>
                    보호자
                  </th>
                  <th>성 명</th>
                  <td colSpan={2}>{admissionInfo?.guardianName}</td>
                  <th>지원자와의 관계</th>
                  <td colSpan={2}>{admissionInfo?.relationWithApplicant}</td>
                </tr>
                <tr>
                  <th>핸드폰</th>
                  <td colSpan={5}>{admissionInfo?.guardianPhoneNumber}</td>
                </tr>
                <tr>
                  <th colSpan={3}>
                    원서작성자(담임) <br /> 성명
                  </th>
                  {admissionInfo?.teacherName ? (
                    <td colSpan={2} className="text-end">
                      {admissionInfo?.teacherName}(인)
                    </td>
                  ) : (
                    <td colSpan={2} className="line-through"></td>
                  )}
                  <th>핸드폰</th>
                  {admissionInfo?.teacherPhoneNumber ? (
                    <td>{admissionInfo?.teacherPhoneNumber}</td>
                  ) : (
                    <td className="line-through"></td>
                  )}
                </tr>
              </thead>
            </table>
            <ApplicantsStatus data={data} />
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
      {!isGEDScore && (
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
                  {[score1_1, score1_2, score2_1, score2_2, score3_1].map((score, index) => (
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
      )}
    </>
  );
};

export default ApplicationPage;
