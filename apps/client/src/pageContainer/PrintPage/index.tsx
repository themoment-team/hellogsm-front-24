'use client';

// import { plusAll } from 'shared';

import { plusAll } from 'shared';
import { GetMyOneseoType, SexEnum } from 'types';

import { OneseoStatus } from 'client/components';

import { PrintIcon } from 'shared/assets';
import { Button } from 'shared/components';
import { defaultSubjectArray } from 'shared/constants';

import { useGetMyOneseo } from 'api/hooks';

interface PrintPageProps {
  initialData: GetMyOneseoType | undefined;
}

const scoreToAlphabet = ['', 'E', 'D', 'C', 'B', 'A'] as const;

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
        className="fixed items-center gap-2 bottom-10 right-10 print:hidden"
        onClick={handlePrint}
      >
        <PrintIcon />
        <p className="text-[2.1vh] font-bold hover:text-white">인쇄하기</p>
      </Button>

      <div className="flex flex-col items-center h-fit justify-center overflow-hidden bg-white p-2 text-[1vh]">
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
                  <td className="w-40 text-center border border-b-0 border-black">
                    {oneseo.oneseoId}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="border border-black">
            <table className="w-full border-collapse text-center text-[1.2vh]">
              <thead>
                <tr>
                  <th className={thStyle + 'w-[3%]'} rowSpan={8}>
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
                  <td
                    rowSpan={6}
                    className={tdStyle + 'h-[25vh] w-[18vh]'}
                    style={{
                      backgroundImage: `url(${oneseo.privacyDetail.profileImg})`,
                      backgroundSize: '18vh 25vh',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></td>
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
            <div className="p-2 text-sm">
              <div className="mb-4">
                위 학생은 2024학년도 귀교 제1학년에 입학하고자 소정의 서류를 갖추어 지원하며, &nbsp;
                <strong>다른 산업수요맞춤형(마이스터)고등학교에 이중지원하지 않을 것을 서약</strong>
                합니다.
              </div>
              <div className="flex justify-center mb-4">
                <p className="mr-6">년</p>
                <p className="mr-6">월</p>
                <p>일</p>
              </div>
              <div className="flex justify-end w-full gap-20 mb-4">
                <p>지원자 :</p>
                <p className="text-end">(인)</p>
              </div>
              <div className="flex justify-end w-full gap-20 mb-4">
                <p>보호자 :</p>
                <p className="text-end">(인)</p>
              </div>
              <div className="text-left ">광주소프트웨어마이스터고등학교장 귀하</div>
              <div className="w-full h-[0.5px] bg-slate-400"></div>
              <div className="text-center ">위 기재 사항이 사실과 같음을 확인합니다.</div>
              <div className="text-base text-right ">중학교장[직인]</div>
            </div>
          </div>
          <div className="my-4 text-center">2차 전형 응시 준비물 : 신분증[학생증], 필기구 등</div>
        </div>
        {
          // 검정고시가 아닌 학생만 성적 입력 확인서 출력
        }

        {!isGEDScore && (
          <div className="relative z-[2] w-[66vh] overflow-hidden">
            <div className="relative p-4 text-black bg-white">
              <div className="relative z-[2] p-6 bg-white border border-gray-300 shadow-md">
                <div
                  id="sample"
                  className="absolute top-[-60px] z-[-2] text-[40vh] text-gray-200 transform rotate-[-30deg] text-center select-none"
                >
                  견본
                </div>
                <p>[서식 3]</p>
                <h1 className="text-[1.8vh] font-bold text-center">
                  {targetDate}학년도 광주소프트웨어마이스터고등학교 입학 전형성적 입력 확인서
                </h1>
                <div className="flex items-end justify-between">
                  <h2 className="text-[1.2vh] mt-[1.5vh] leading-[2vh]">일반교과</h2>
                  <div>
                    <table>
                      <tr>
                        <th className="w-20 border border-b-0 border-black bg-[#e9e9e9] p-[0.2vh] align-middle font-medium">
                          접수번호
                        </th>
                        <td className="w-40 text-center border border-b-0 border-black">
                          {oneseo.oneseoId}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div className="flex border border-black h-fit">
                  <div className="flex flex-col w-full border-r border-black">
                    <div className="relative z-10 border-b border-black">
                      <div className="text-right h-[2.2vh]">학년</div>
                      <div className="text-left h-[2.2vh]">과목</div>
                      <div className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-contain bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><line x1=\'0\' y1=\'0\' x2=\'100%\' y2=\'100%\' stroke=\'gray\' /></svg>')]"></div>
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
                  <div className="flex flex-col w-full border-b-0 border-r border-black">
                    <div className="flex flex-col ">
                      <div className="font-bold bg-gray-200 border-b border-black text-center p-[0.2vh] h-[2.2vh]">
                        1학년 1학기
                      </div>
                      <div className="font-bold bg-gray-200 border-b border-black text-center p-[0.2vh] h-[2.2vh]">
                        성취도/평어
                      </div>
                    </div>
                    {!oneseo.middleSchoolAchievement.achievement1_1 ? (
                      <div className="h-full bg-no-repeat bg-contain bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><line x1=\'0\' y1=\'0\' x2=\'100%\' y2=\'100%\' stroke=\'gray\' /></svg>')]"></div>
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
                  <div className="flex flex-col w-full border-r border-black">
                    <div className="flex flex-col">
                      <div className="font-bold bg-gray-200 border-b border-black text-center p-[0.2vh] h-[2.2vh]">
                        1학년 2학기
                      </div>
                      <div className="font-bold bg-gray-200 border-b-0 border-black text-center p-[0.2vh] h-[2.2vh]">
                        성취도/평어
                      </div>
                    </div>
                    {!oneseo.middleSchoolAchievement.achievement1_2 ? (
                      <div className="h-full bg-no-repeat bg-contain bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><line x1=\'0\' y1=\'0\' x2=\'100%\' y2=\'100%\' stroke=\'gray\' /></svg>')]"></div>
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
                  <div className="flex flex-col w-full border-r border-black">
                    <div className="flex flex-col">
                      <div className="font-bold bg-gray-200 border-b border-black text-center p-[0.2vh] h-[2.2vh]">
                        2학년 1학기
                      </div>
                      <div className="font-bold bg-gray-200 border-b border-black text-center p-[0.2vh] h-[2.2vh]">
                        성취도/평어
                      </div>
                    </div>
                    {!oneseo.middleSchoolAchievement.achievement2_1 ? (
                      <div className="h-full bg-no-repeat bg-contain bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><line x1=\'0\' y1=\'0\' x2=\'100%\' y2=\'100%\' stroke=\'gray\' /></svg>')]"></div>
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
                  <div className="flex flex-col w-full border-r border-black">
                    <div className="flex flex-col">
                      <div className="font-bold bg-gray-200 border-b border-black text-center p-[0.2vh] h-[2.2vh]">
                        2학년 2학기
                      </div>
                      <div className="font-bold bg-gray-200 border-b border-black text-center p-[0.2vh] h-[2.2vh]">
                        성취도/평어
                      </div>
                    </div>
                    {!oneseo.middleSchoolAchievement.achievement2_2 ? (
                      <div className="h-full bg-no-repeat bg-contain bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><line x1=\'0\' y1=\'0\' x2=\'100%\' y2=\'100%\' stroke=\'gray\' /></svg>')]"></div>
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
                  <div className="flex flex-col w-full border-black">
                    <div className="flex flex-col">
                      <div className="font-bold bg-gray-200 border-b border-black text-center p-[0.2vh] h-[2.2vh]">
                        3학년 1학기
                      </div>
                      <div className="font-bold bg-gray-200 border-b border-black text-center p-[0.2vh] h-[2.2vh]">
                        성취도/평어
                      </div>
                    </div>
                    {!oneseo.middleSchoolAchievement.achievement3_1 ? (
                      <div className="h-full bg-no-repeat bg-contain bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><line x1=\'0\' y1=\'0\' x2=\'100%\' y2=\'100%\' stroke=\'gray\' /></svg>')]"></div>
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
                <h2 className="text-[1.2vh] mt-[1.5vh] leading-[2vh]">체육예술교과</h2>
                <div className="flex flex-col border border-black h-fit">
                  <div className="flex h-full">
                    <div className="flex flex-col w-full border-r border-black">
                      <div className="relative z-10 border-b border-black">
                        <div className="text-right h-[2.2vh]">학년</div>
                        <div className="text-left h-[2.2vh]">과목</div>
                        <div className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-contain bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><line x1=\'0\' y1=\'0\' x2=\'100%\' y2=\'100%\' stroke=\'gray\' /></svg>')]"></div>
                      </div>
                      {oneseo.middleSchoolAchievement.artsPhysicalSubjects?.map((subject) => (
                        <div
                          key={subject}
                          className="flex items-center justify-center border-b border-black"
                        >
                          {subject}
                        </div>
                      ))}
                      {/* {oneseo.middleSchoolAchievement.artsPhysicalSubjects?.map((subject) => (
                    <div
                      key={subject}
                      className="flex items-center justify-center border-b border-black"
                    >
                      {subject}
                    </div>
                  ))} */}
                      <div className="flex items-center justify-center">환산점</div>
                    </div>
                    <div className="flex flex-col w-full border-r border-black">
                      <div className="font-bold bg-gray-200 border-b border-black text-center p-[0.2vh] h-[2.2vh]">
                        1학년
                      </div>
                      <div className="flex items-center justify-center border-b border-black">
                        {oneseo.middleSchoolAchievement.artsPhysicalAchievement[0]}
                      </div>
                    </div>
                    <div className="flex flex-col w-full border-r border-black">
                      <div className="font-bold bg-gray-200 border-b border-black text-center p-[0.2vh] h-[2.2vh]">
                        2학년
                      </div>
                      <div className="flex items-center justify-center border-b border-black">
                        {oneseo.middleSchoolAchievement.artsPhysicalAchievement[1]}
                      </div>
                    </div>
                    <div className="flex flex-col w-full border-r border-black">
                      <div className="font-bold bg-gray-200 border-b border-black text-center p-[0.2vh] h-[2.2vh]">
                        3학년
                      </div>
                      <div className="flex items-center justify-center border-b border-black">
                        {oneseo.middleSchoolAchievement.artsPhysicalAchievement[2]}
                      </div>
                    </div>
                    <div className="flex flex-col w-full border-r border-black">
                      <div className="font-bold bg-gray-200 border-b border-black text-center p-[0.2vh] h-[2.2vh]">
                        환산점
                      </div>
                      <div className="flex items-center justify-center border-b border-black">
                        {oneseo.middleSchoolAchievement.artsPhysicalAchievement}
                      </div>
                    </div>
                    <div className="flex flex-col w-full border-r border-black">
                      <div className="font-bold bg-gray-200 border-b border-black text-center p-[0.2vh] h-[2.2vh]">
                        성취도/평어
                      </div>
                      <div className="flex items-center justify-center border-b border-black">
                        {/* {admissionGrade?.artisticScore} */}
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="text-[1.2vh] mt-[1.5vh] leading-[2vh]">비교과</h2>
                <table className="w-full border-collapse border text-[1vh]">
                  <thead>
                    <tr>
                      <th
                        className="border border-black p-[0.3vh] font-bold bg-gray-200"
                        rowSpan={2}
                      >
                        학년
                      </th>
                      <th
                        className="border border-black p-[0.3vh] font-bold bg-gray-200"
                        colSpan={6}
                      >
                        미인정 출결 현황
                      </th>
                      <th
                        className="border border-black p-[0.3vh] font-bold bg-gray-200"
                        colSpan={2}
                      >
                        봉사활동
                      </th>
                    </tr>
                  </thead>
                  <tbody>{/* 표 내용은 동일한 구조로 추가 */}</tbody>
                </table>
                <table className="mx-auto w-[80%] border-collapse border text-[1vh] mt-[1.5vh]">
                  <thead>
                    <tr>
                      <th
                        className="border border-black p-[0.3vh] font-bold bg-gray-200"
                        colSpan={4}
                      >
                        입력자 확인
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="border border-black p-[0.3vh] font-bold bg-gray-200">
                        담임교사
                      </th>
                      <td className="border border-black p-[0.3vh] text-right">(인)</td>
                      <th className="border border-black p-[0.3vh] font-bold bg-gray-200">
                        지원자
                      </th>
                      <td className="border border-black p-[0.3vh] text-right">(인)</td>
                    </tr>
                  </tbody>
                </table>
                <table className="mx-auto w-[50%] border-collapse border text-[1vh] mt-[1.5vh]">
                  <thead>
                    <tr>
                      <th
                        className="border border-black p-[0.3vh] font-bold bg-gray-200"
                        rowSpan={2}
                      >
                        접수자 확인
                      </th>
                      <th className="border border-black p-[0.3vh] font-bold bg-gray-200">1차</th>
                      <td className="border border-black p-[0.3vh] text-right">(인)</td>
                    </tr>
                    <tr>
                      <th className="border border-black p-[0.3vh] font-bold bg-gray-200">2차</th>
                      <td className="border border-black p-[0.3vh] text-right">(인)</td>
                    </tr>
                  </thead>
                </table>
                <div className="text-center text-[1.2vh] mt-[2vh]">
                  <p>위와 같이 입력하고 확인하였음을 증명합니다.</p>
                  <div className="flex justify-center mb-4">
                    <p className="mr-6">년</p>
                    <p className="mr-6">월</p>
                    <p>일</p>
                  </div>
                  <div className="flex justify-between text-[1vh] mt-[1vh]  text-sm">
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
