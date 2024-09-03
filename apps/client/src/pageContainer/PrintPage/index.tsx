'use client';

// import { plusAll } from 'shared';

import { plusAll } from 'shared';
import { GetMyOneseoType, SexEnum } from 'types';

import { OneseoStatus } from 'client/components';
import { cn } from 'client/lib/utils';

import { PrintIcon } from 'shared/assets';
import { Button } from 'shared/components';
import { artPhysicalSubjectArray, defaultSubjectArray } from 'shared/constants';

import { useGetMyOneseo } from 'api/hooks';

interface PrintPageProps {
  initialData: GetMyOneseoType | undefined;
}

const scoreToAlphabet = ['없음', 'E', 'D', 'C', 'B', 'A'] as const;

const thStyle = 'border border-black bg-[#e9e9e9] ';
const tdStyle = 'border border-black ';

const ApplicationPage = ({ initialData }: PrintPageProps) => {
  const { data: oneseo } = useGetMyOneseo({ initialData: initialData });

  if (!oneseo) return <>원서 정보가 없습니다</>;

  const isGEDScore = !!oneseo.middleSchoolAchievement.gedTotalScore;

  const date = new Date();

  const targetDate = date.getFullYear() + 1;

  // const isGEDScore = !!oneseo.middleSchoolAchievement.gedTotalScore;

  // const conversionDays =
  //   !isGEDScore &&
  //   oneseo.middleSchoolAchievement &&
  //   30 - plusAll(oneseo.middleSchoolAchievement.attendanceDays) / 3;

  const handlePrint = () => {
    window.print();
  };

  let currentIdx = 0;

  const artPhysicalScores = [...oneseo.middleSchoolAchievement.artsPhysicalAchievement];

  const getArtPhysicalElement = (achievement: number[] | null) => {
    if (!achievement) {
      return <div className="h-full bg-slash bg-contain bg-no-repeat"></div>;
    }

    const subjectLength = oneseo.middleSchoolAchievement.artsPhysicalSubjects.length;

    const arr = artPhysicalScores.slice(currentIdx, currentIdx + subjectLength);

    currentIdx += subjectLength;

    return (
      <>
        {arr.map((score, i) => (
          <div key={i} className="flex items-center justify-center border-b border-black">
            {scoreToAlphabet[score]}
          </div>
        ))}
        <div className="flex items-center justify-center border-b-0 border-black">
          {plusAll(arr)}
        </div>
      </>
    );
  };

  const calcVolunteerScore = (time: number) => {
    if (time > 6) return 10;
    if (time < 4) return 2;
    if (time === 4) return 4;
    if (time === 6) return 8;
    return 6;
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            header,
            #sample,
            footer {
              display: none !important;
            }
          }
        }
      `}</style>
      {/* 입학원서 */}
      <Button
        className="fixed bottom-10 right-24 items-center gap-2 print:hidden"
        onClick={handlePrint}
      >
        <PrintIcon />
        <p className="text-[2.1vh] font-bold hover:text-white">인쇄하기</p>
      </Button>

      <div className="flex h-fit flex-col items-center justify-center overflow-hidden bg-white p-2 text-[1vh]">
        <div className="relative z-[2] w-[63vh]">
          <div
            id="sample"
            className="absolute z-[-1] rotate-[-30deg] select-none text-center text-[40vh] text-gray-200"
          >
            견본
          </div>
          <p>[서식 1]</p>
          <div className="text-center text-[3vh] font-bold">
            광주소프트웨어마이스터고등학교 입학원서
          </div>
          <div className="flex items-end justify-between">
            <div className="mt-[1.5vh] text-lg font-bold leading-[2vh]">
              {targetDate}학년도 신입생 입학전형
            </div>
            <div>
              <table>
                <tr>
                  <th className="w-20 border border-b-0 border-black bg-[#e9e9e9] p-[0.2vh] align-middle font-medium">
                    접수번호
                  </th>
                  <td className="w-40 border border-b-0 border-black text-center">
                    {oneseo.submitCode}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="border border-r-0 border-t-0 border-black">
            <table className="w-full border-collapse text-center text-[1.2vh]">
              <thead>
                <tr>
                  <th className={thStyle + 'w-[3%] border-l-0'} rowSpan={8}>
                    인적사항
                  </th>
                </tr>
                <tr>
                  <th className={thStyle + 'w-[3%]'} rowSpan={3}>
                    지원자
                  </th>
                  <th className={thStyle}>성 명</th>
                  <td className={tdStyle}>{oneseo.privacyDetail.name}</td>
                  <th className={thStyle + 'w-[3%]'}>성별</th>
                  <td className={tdStyle}>{SexEnum[oneseo.privacyDetail.sex ?? 'MALE']}</td>
                  <th className={thStyle}>생년월일</th>
                  <td className={tdStyle}>{oneseo.privacyDetail.birth}</td>
                  <td rowSpan={6} className={tdStyle + 'h-[25vh] w-[18vh]'}>
                    <img
                      src={oneseo.privacyDetail.profileImg}
                      alt="증명사진"
                      className={cn('h-[25vh]', 'w-[18vh]')}
                    />
                  </td>
                </tr>
                <tr>
                  <th className={thStyle}>주 소</th>
                  <td className={tdStyle} colSpan={5}>
                    {oneseo.privacyDetail.address}
                  </td>
                </tr>
                <tr>
                  <th className={thStyle}>연락처</th>
                  {/* <th>집전화</th>
                  {oneseo.privacyDetail.phoneNumber ? (
                    <td colSpan={1}>{oneseo.privacyDetail.phoneNumber}</td>
                  ) : (
                    <td colSpan={2} className="line-through"></td>
                  )} */}
                  <th className={thStyle}>핸드폰</th>
                  <td colSpan={4} className={tdStyle}>
                    {oneseo.privacyDetail.phoneNumber}
                  </td>
                </tr>
                <tr>
                  <th className={thStyle + 'w-[3%]'} rowSpan={2}>
                    보호자
                  </th>
                  <th className={thStyle}>성 명</th>
                  <td className={tdStyle} colSpan={1}>
                    {oneseo.privacyDetail.guardianName}
                  </td>
                  <th className={thStyle} colSpan={2}>
                    지원자와의 관계
                  </th>
                  <td className={tdStyle} colSpan={2}>
                    {oneseo.privacyDetail.relationshipWithGuardian}
                  </td>
                </tr>
                <tr>
                  <th className={thStyle}>핸드폰</th>
                  <td className={tdStyle} colSpan={5}>
                    {oneseo.privacyDetail.guardianPhoneNumber}
                  </td>
                </tr>
                <tr>
                  <th className={thStyle} colSpan={3} rowSpan={6}>
                    원서작성자(담임) <br /> 성명
                  </th>
                  {oneseo.privacyDetail.schoolTeacherName ? (
                    <td colSpan={2} className={tdStyle + 'text-end'} rowSpan={3}>
                      {oneseo.privacyDetail.schoolTeacherName}(인)
                    </td>
                  ) : (
                    <td className={tdStyle + 'line-through'} colSpan={2} rowSpan={3} />
                  )}
                  <th className={thStyle}>핸드폰</th>
                  {oneseo.privacyDetail.schoolTeacherPhoneNumber ? (
                    <td>{oneseo.privacyDetail.schoolTeacherPhoneNumber}</td>
                  ) : (
                    <td className={tdStyle + 'line-through'} />
                  )}
                </tr>
              </thead>
            </table>
            <OneseoStatus oneseo={oneseo} />
            <div className="border-r border-black p-2 text-sm">
              <div className="mb-4">
                위 학생은 2024학년도 귀교 제1학년에 입학하고자 소정의 서류를 갖추어 지원하며, &nbsp;
                <strong>다른 산업수요맞춤형(마이스터)고등학교에 이중지원하지 않을 것을 서약</strong>
                합니다.
              </div>
              <div className="mb-4 flex justify-center">
                <p className="mr-6">년</p>
                <p className="mr-6">월</p>
                <p>일</p>
              </div>
              <div className="mb-4 flex w-full justify-end gap-20">
                <p>지원자 :</p>
                <p className="text-end">(인)</p>
              </div>
              <div className="mb-4 flex w-full justify-end gap-20">
                <p>보호자 :</p>
                <p className="text-end">(인)</p>
              </div>
              <div className="text-left">광주소프트웨어마이스터고등학교장 귀하</div>
              <div className="h-[0.5px] w-full bg-slate-400"></div>
              <div className="text-center">위 기재 사항이 사실과 같음을 확인합니다.</div>
              <div className="text-right text-base">중학교장[직인]</div>
            </div>
          </div>
          <div className="my-4 text-center">2차 전형 응시 준비물 : 신분증[학생증], 필기구 등</div>
        </div>
        {
          // 검정고시가 아닌 학생만 성적 입력 확인서 출력
        }

        {!isGEDScore && (
          <div className="relative z-[2] w-[66vh] overflow-hidden">
            <div className="relative bg-white p-4 text-black">
              <div className="relative z-[2] border border-gray-300 bg-white p-6 shadow-md">
                <div
                  id="sample"
                  className="absolute top-[-60px] z-[-2] rotate-[-30deg] transform select-none text-center text-[40vh] text-gray-200"
                >
                  견본
                </div>
                <p>[서식 3]</p>
                <h1 className="text-center text-[1.8vh] font-bold">
                  {targetDate}학년도 광주소프트웨어마이스터고등학교 입학 전형성적 입력 확인서
                </h1>
                <div className="flex items-end justify-between">
                  <h2 className="mt-[1.5vh] text-[1.2vh] leading-[2vh]">일반교과</h2>
                  <div>
                    <table>
                      <tr>
                        <th className="w-20 border border-b-0 border-black bg-[#e9e9e9] p-[0.2vh] align-middle font-medium">
                          접수번호
                        </th>
                        <td className="w-40 border border-b-0 border-black text-center">
                          {oneseo.oneseoId}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div className="flex h-fit border border-black">
                  <div className="flex w-full flex-col border-r border-black">
                    <div className="relative z-10 border-b border-black bg-backslash">
                      <div className="h-[2.2vh] text-right">학년</div>
                      <div className="h-[2.2vh] text-left">과목</div>
                    </div>
                    {[
                      ...defaultSubjectArray,
                      ...(oneseo.middleSchoolAchievement.newSubjects ?? []),
                    ].map((subject) => (
                      <div
                        key={subject}
                        className="flex items-center justify-center border-b border-black"
                      >
                        {subject}
                      </div>
                    ))}
                    <div className="flex items-center justify-center">환산점</div>
                  </div>
                  <div className="flex w-full flex-col border-b-0 border-r border-black">
                    <div className="flex flex-col">
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        1학년 1학기
                      </div>
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        성취도/평어
                      </div>
                    </div>
                    {!oneseo.middleSchoolAchievement.achievement1_1 ? (
                      <div className="h-full bg-slash bg-contain bg-no-repeat"></div>
                    ) : (
                      <>
                        {oneseo.middleSchoolAchievement.achievement1_1.map((score, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-center border-b border-black"
                          >
                            {scoreToAlphabet[score]}
                          </div>
                        ))}
                        <div className="flex items-center justify-center border-b-0 border-black">
                          {plusAll(oneseo.middleSchoolAchievement.achievement1_1)}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex w-full flex-col border-r border-black">
                    <div className="flex flex-col">
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        1학년 2학기
                      </div>
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        성취도/평어
                      </div>
                    </div>
                    {!oneseo.middleSchoolAchievement.achievement1_2 ? (
                      <div className="h-full bg-slash bg-contain bg-no-repeat"></div>
                    ) : (
                      <>
                        {oneseo.middleSchoolAchievement.achievement1_2.map((score, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-center border-b border-black"
                          >
                            {scoreToAlphabet[score]}
                          </div>
                        ))}
                        <div className="flex items-center justify-center border-b-0 border-black">
                          {plusAll(oneseo.middleSchoolAchievement.achievement1_2)}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex w-full flex-col border-r border-black">
                    <div className="flex flex-col">
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        2학년 1학기
                      </div>
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        성취도/평어
                      </div>
                    </div>
                    {!oneseo.middleSchoolAchievement.achievement2_1 ? (
                      <div className="h-full bg-slash bg-contain bg-no-repeat"></div>
                    ) : (
                      <>
                        {oneseo.middleSchoolAchievement.achievement2_1.map((score, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-center border-b border-black"
                          >
                            {scoreToAlphabet[score]}
                          </div>
                        ))}
                        <div className="flex items-center justify-center border-b-0 border-black">
                          {plusAll(oneseo.middleSchoolAchievement.achievement2_1)}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex w-full flex-col border-r border-black">
                    <div className="flex flex-col">
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        2학년 2학기
                      </div>
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        성취도/평어
                      </div>
                    </div>
                    {!oneseo.middleSchoolAchievement.achievement2_2 ? (
                      <div className="h-full bg-slash bg-contain bg-no-repeat"></div>
                    ) : (
                      <>
                        {oneseo.middleSchoolAchievement.achievement2_2.map((score, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-center border-b border-black"
                          >
                            {scoreToAlphabet[score]}
                          </div>
                        ))}
                        <div className="flex items-center justify-center border-b-0 border-black">
                          {plusAll(oneseo.middleSchoolAchievement.achievement2_2)}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex w-full flex-col border-black">
                    <div className="flex flex-col">
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        3학년 1학기
                      </div>
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        성취도/평어
                      </div>
                    </div>
                    {!oneseo.middleSchoolAchievement.achievement3_1 ? (
                      <div className="h-full bg-slash bg-contain bg-no-repeat"></div>
                    ) : (
                      <>
                        {oneseo.middleSchoolAchievement.achievement3_1.map((score, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-center border-b border-black"
                          >
                            {scoreToAlphabet[score]}
                          </div>
                        ))}
                        <div className="flex items-center justify-center border-b-0 border-black">
                          {plusAll(oneseo.middleSchoolAchievement.achievement3_1)}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <h2 className="mt-[1.5vh] text-[1.2vh] leading-[2vh]">체육예술교과</h2>
                <div className="flex h-fit border border-black">
                  <div className="flex w-full flex-col border-r border-black">
                    <div className="relative z-10 border-b border-black bg-backslash">
                      <div className="h-[2.2vh] text-right">학년</div>
                      <div className="h-[2.2vh] text-left">과목</div>
                    </div>
                    {[...artPhysicalSubjectArray].map((subject) => (
                      <div
                        key={subject}
                        className="flex items-center justify-center border-b border-black"
                      >
                        {subject}
                      </div>
                    ))}
                    <div className="flex items-center justify-center">환산점</div>
                  </div>
                  <div className="flex w-full flex-col border-b-0 border-r border-black">
                    <div className="flex flex-col">
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        1학년 1학기
                      </div>
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        성취도/평어
                      </div>
                    </div>
                    {getArtPhysicalElement(oneseo.middleSchoolAchievement.achievement1_1)}
                  </div>
                  <div className="flex w-full flex-col border-r border-black">
                    <div className="flex flex-col">
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        1학년 2학기
                      </div>
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        성취도/평어
                      </div>
                    </div>
                    {getArtPhysicalElement(oneseo.middleSchoolAchievement.achievement1_2)}
                  </div>
                  <div className="flex w-full flex-col border-r border-black">
                    <div className="flex flex-col">
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        2학년 1학기
                      </div>
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        성취도/평어
                      </div>
                    </div>
                    {getArtPhysicalElement(oneseo.middleSchoolAchievement.achievement2_1)}
                  </div>
                  <div className="flex w-full flex-col border-r border-black">
                    <div className="flex flex-col">
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        2학년 2학기
                      </div>
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        성취도/평어
                      </div>
                    </div>
                    {getArtPhysicalElement(oneseo.middleSchoolAchievement.achievement2_2)}
                  </div>
                  <div className="flex w-full flex-col border-black">
                    <div className="flex flex-col">
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        3학년 1학기
                      </div>
                      <div className="h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold">
                        성취도/평어
                      </div>
                    </div>
                    {getArtPhysicalElement(oneseo.middleSchoolAchievement.achievement3_1)}
                  </div>
                </div>
                <h2 className="mt-[1.5vh] text-[1.2vh] leading-[2vh]">비교과</h2>
                <table className="w-full border-collapse border text-[1vh]">
                  <thead>
                    <tr>
                      <th
                        className="border border-black bg-gray-200 p-[0.3vh] font-bold"
                        rowSpan={2}
                      >
                        학년
                      </th>
                      <th
                        className="border border-black bg-gray-200 p-[0.3vh] font-bold"
                        colSpan={6}
                      >
                        미인정 출결 현황
                      </th>
                      <th
                        className="border border-black bg-gray-200 p-[0.3vh] font-bold"
                        colSpan={2}
                      >
                        봉사활동
                      </th>
                    </tr>
                    <tr className="text-center">
                      <td className="border border-black">결석</td>
                      <td className="border border-black">지각</td>
                      <td className="border border-black">조퇴</td>
                      <td className="border border-black">결과</td>
                      <td className="border border-black">환산일수</td>
                      <td className="border border-black">환산점</td>
                      <td className="border border-black">시간</td>
                      <td className="border border-black">환산점</td>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <td className="border border-black">1</td>
                      {[
                        oneseo.middleSchoolAchievement.absentDays[1],
                        oneseo.middleSchoolAchievement.attendanceDays[0],
                        oneseo.middleSchoolAchievement.attendanceDays[3],
                        oneseo.middleSchoolAchievement.attendanceDays[6],
                      ].map((day, index) => (
                        <td className="border border-black" key={day + ' ' + index}>
                          {day}
                        </td>
                      ))}
                      <td className="border border-black" rowSpan={3}>
                        {plusAll(oneseo.middleSchoolAchievement.absentDays)}
                      </td>
                      <td className="border border-black" rowSpan={3}>
                        {Math.max(30 - plusAll(oneseo.middleSchoolAchievement.absentDays) * 3, 0)}
                      </td>
                      <td className="border border-black">
                        {oneseo.middleSchoolAchievement.volunteerTime[0]}
                      </td>
                      <td className="border border-black" rowSpan={3}>
                        {plusAll([
                          oneseo.middleSchoolAchievement.volunteerTime.map((time) =>
                            calcVolunteerScore(time),
                          ),
                        ])}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black">2</td>
                      {[
                        oneseo.middleSchoolAchievement.absentDays[1],
                        oneseo.middleSchoolAchievement.attendanceDays[1],
                        oneseo.middleSchoolAchievement.attendanceDays[4],
                        oneseo.middleSchoolAchievement.attendanceDays[7],
                      ].map((day, index) => (
                        <td className="border border-black" key={day + ' ' + index}>
                          {day}
                        </td>
                      ))}
                      <td className="border border-black">
                        {oneseo.middleSchoolAchievement.volunteerTime[1]}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black">3</td>
                      {[
                        oneseo.middleSchoolAchievement.absentDays[1],
                        oneseo.middleSchoolAchievement.attendanceDays[2],
                        oneseo.middleSchoolAchievement.attendanceDays[5],
                        oneseo.middleSchoolAchievement.attendanceDays[8],
                      ].map((day, index) => (
                        <td className="border border-black" key={day + ' ' + index}>
                          {day}
                        </td>
                      ))}
                      <td className="border border-black">
                        {oneseo.middleSchoolAchievement.volunteerTime[2]}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="mx-auto mt-[1.5vh] w-[80%] border-collapse border text-[1vh]">
                  <thead>
                    <tr>
                      <th
                        className="border border-black bg-gray-200 p-[0.3vh] font-bold"
                        colSpan={4}
                      >
                        입력자 확인
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="border border-black bg-gray-200 p-[0.3vh] font-bold">
                        담임교사
                      </th>
                      <td className="border border-black p-[0.3vh] text-right">(인)</td>
                      <th className="border border-black bg-gray-200 p-[0.3vh] font-bold">
                        지원자
                      </th>
                      <td className="border border-black p-[0.3vh] text-right">(인)</td>
                    </tr>
                  </tbody>
                </table>
                <table className="mx-auto mt-[1.5vh] w-[50%] border-collapse border text-[1vh]">
                  <thead>
                    <tr>
                      <th
                        className="border border-black bg-gray-200 p-[0.3vh] font-bold"
                        rowSpan={2}
                      >
                        접수자 확인
                      </th>
                      <th className="border border-black bg-gray-200 p-[0.3vh] font-bold">1차</th>
                      <td className="border border-black p-[0.3vh] text-right">(인)</td>
                    </tr>
                    <tr>
                      <th className="border border-black bg-gray-200 p-[0.3vh] font-bold">2차</th>
                      <td className="border border-black p-[0.3vh] text-right">(인)</td>
                    </tr>
                  </thead>
                </table>
                <div className="mt-[2vh] text-center text-[1.2vh]">
                  <p>위와 같이 입력하고 확인하였음을 증명합니다.</p>
                  <div className="mb-4 flex justify-center">
                    <p className="mr-6">년</p>
                    <p className="mr-6">월</p>
                    <p>일</p>
                  </div>
                  <div className="mt-[1vh] flex justify-between text-[1vh] text-sm">
                    <span>광주소프트웨어마이스터고등학교장 귀하</span>
                    <span>중학교장[직인]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicationPage;
