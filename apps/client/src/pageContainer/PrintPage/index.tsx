'use client';

import { ArtsPhysicalSubjectsScoreDetailType, GetMyOneseoType, SexEnum } from 'types';

import { OneseoStatus } from 'client/components';

import { PrintIcon } from 'shared/assets';
import { Button } from 'shared/components';
import { ARTS_PHYSICAL_SUBJECTS, GENERAL_SUBJECTS } from 'shared/constants';
import { cn } from 'shared/lib/utils';

import { useGetMyOneseo } from 'api/hooks';

interface PrintPageProps {
  initialData: GetMyOneseoType | undefined;
}

const semesterArray: string[] = [
  '1학년 2학기',
  '2학년 1학기',
  '2학년 2학기',
  '3학년 1학기',
  '3학년 2학기',
] as const;

const semesterToScore: { [key: string]: keyof ArtsPhysicalSubjectsScoreDetailType } = {
  '1학년 2학기': 'score1_2',
  '2학년 1학기': 'score2_1',
  '2학년 2학기': 'score2_2',
  '3학년 1학기': 'score3_1',
  '3학년 2학기': 'score3_2',
};

const scoreToAlphabet = ['없음', 'E', 'D', 'C', 'B', 'A'] as const;

const thStyle = 'border border-black bg-[#e9e9e9] ';
const tdStyle = 'border border-black ';

const ApplicationPage = ({ initialData }: PrintPageProps) => {
  const { data: oneseo } = useGetMyOneseo({ initialData: initialData });

  const artPhysicalScores = (() => {
    if (!oneseo || oneseo.privacyDetail.graduationType === 'GED')
      return [null, null, null, null, null];

    let index = 0;
    return semesterArray.map((semester) => {
      if (oneseo.calculatedScore.artsPhysicalSubjectsScoreDetail[semesterToScore[semester]] >= 0) {
        const scoreArray = [
          ...oneseo.middleSchoolAchievement.artsPhysicalAchievement.slice(index, index + 3),
          oneseo.calculatedScore.artsPhysicalSubjectsScoreDetail[semesterToScore[semester]],
        ];
        index += 3;

        return scoreArray;
      } else return null;
    });
  })();

  if (!oneseo) return <>원서 정보가 없습니다</>;

  const date = new Date();

  const targetDate = date.getFullYear() + 1;

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

          @page {
            margin: 0;
          }
        }
      `}</style>
      {/* 입학원서 */}
      <Button
        className={cn(
          'fixed',
          'bottom-10',
          'right-24',
          'z-50',
          'items-center',
          'gap-2',
          'print:hidden',
        )}
        onClick={handlePrint}
      >
        <PrintIcon />
        <p className={cn('text-[2.1vh]', 'font-bold', 'hover:text-white')}>인쇄하기</p>
      </Button>

      <div
        className={cn(
          'flex h-fit flex-col items-center justify-center overflow-hidden bg-white p-2 text-[1vh]',
        )}
      >
        <div className={cn('relative', 'z-[2]', 'w-[63vh]')}>
          <div
            id="sample"
            className={cn(
              'absolute z-[-1] rotate-[-30deg] select-none text-center text-[40vh] text-gray-200',
            )}
          >
            견본
          </div>
          <p>[서식 1]</p>
          <div className={cn('text-center', 'text-[3vh]', 'font-bold')}>
            광주소프트웨어마이스터고등학교 입학원서
          </div>
          <div className={cn('flex', 'items-end', 'justify-between')}>
            <div className={cn('mt-[1.5vh]', 'text-lg', 'font-bold', 'leading-[2vh]')}>
              {targetDate}학년도 신입생 입학전형
            </div>
            <div>
              <table>
                <tr>
                  <th
                    className={cn(
                      'w-20 border border-b-0 border-black bg-[#e9e9e9] p-[0.2vh] align-middle font-medium',
                    )}
                  >
                    접수번호
                  </th>
                  <td className={cn('w-40', 'border', 'border-b-0', 'border-black', 'text-center')}>
                    {oneseo.submitCode}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className={cn('border', 'border-r-0', 'border-t-0', 'border-black')}>
            <table className={cn('w-full', 'border-collapse', 'text-center', 'text-[1.2vh]')}>
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
                    <td colSpan={2} className={cn("line-through")}></td>
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
                    지원자 {oneseo.privacyDetail.name}의{' '}
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
                  <td
                    colSpan={2}
                    className={cn([
                      tdStyle,
                      'text-end',
                      oneseo.privacyDetail.graduationType !== 'CANDIDATE' && [
                        'bg-slash',
                        'bg-contain',
                        'bg-no-repeat',
                      ],
                    ])}
                    rowSpan={3}
                  >
                    {oneseo.privacyDetail.graduationType === 'CANDIDATE' && '(인)'}
                  </td>
                  <th className={thStyle}>핸드폰</th>
                  {oneseo.privacyDetail.graduationType === 'CANDIDATE' ? (
                    <td className={cn('border-b', 'border-black')}>
                      {oneseo.privacyDetail.schoolTeacherPhoneNumber}
                    </td>
                  ) : (
                    <td className={cn([tdStyle, 'bg-slash', 'bg-contain', 'bg-no-repeat'])} />
                  )}
                </tr>
              </thead>
            </table>
            <OneseoStatus oneseo={oneseo} />
            <div className={cn('border-r', 'border-black', 'p-2', 'text-sm')}>
              <div className={cn('mb-4')}>
                위 학생은 2025학년도 귀교 제1학년에 입학하고자 소정의 서류를 갖추어 지원하며, &nbsp;
                <strong>다른 산업수요맞춤형(마이스터)고등학교에 이중지원하지 않을 것을 서약</strong>
                합니다.
              </div>
              <div className={cn('mb-4', 'flex', 'justify-center')}>
                <p className={cn('mr-6')}>년</p>
                <p className={cn('mr-6')}>월</p>
                <p>일</p>
              </div>
              <div className={cn('mb-4', 'flex', 'w-full', 'justify-end', 'gap-20')}>
                <p>지원자 :</p>
                <p className={cn('text-end')}>(인)</p>
              </div>
              <div className={cn('mb-4', 'flex', 'w-full', 'justify-end', 'gap-20')}>
                <p>보호자 :</p>
                <p className={cn('text-end')}>(인)</p>
              </div>
              <div className={cn('text-left')}>광주소프트웨어마이스터고등학교장 귀하</div>
              {oneseo.privacyDetail.graduationType !== 'GED' && (
                <>
                  <div className={cn('mb-3', 'h-[0.5px]', 'w-full', 'bg-slate-400')} />
                  <div className={cn('text-center')}>
                    위 기재 사항이 사실과 다름이 없음을 증명하며,
                    <br />위 학생이 귀교 교육과정을 성실히 이수할 수 있다고 판단되어 이에
                    추천합니다.
                  </div>
                  <div className={cn('text-right', 'text-base')}>중학교장[직인]</div>
                </>
              )}
            </div>
          </div>
          <div className={cn('my-4', 'text-center')}>
            2차 전형 응시 준비물 : 신분증[학생증], 필기구 등
          </div>
        </div>
        {
          // 검정고시가 아닌 학생만 성적 입력 확인서 출력
        }

        {oneseo.privacyDetail.graduationType !== 'GED' && (
          <div className={cn('relative', 'z-[2]', 'w-[66vh]', 'overflow-hidden')}>
            <div className={cn('relative', 'bg-white', 'p-4', 'text-black')}>
              <div
                className={cn(
                  'relative',
                  'z-[2]',
                  'border',
                  'border-gray-300',
                  'bg-white',
                  'p-6',
                  'shadow-md',
                )}
              >
                <div
                  id="sample"
                  className={cn(
                    'absolute top-[-60px] z-[-2] rotate-[-30deg] transform select-none text-center text-[40vh] text-gray-200',
                  )}
                >
                  견본
                </div>
                <p>[서식 3]</p>
                <h1 className={cn('text-center', 'text-[1.8vh]', 'font-bold')}>
                  {targetDate}학년도 광주소프트웨어마이스터고등학교 입학 전형성적 입력 확인서
                </h1>
                <div className={cn('flex', 'items-end', 'justify-between')}>
                  <h2 className={cn('mt-[1.5vh]', 'text-[1.2vh]', 'leading-[2vh]')}>일반교과</h2>
                  <div>
                    <table>
                      <tr>
                        <th
                          className={cn(
                            'w-20 border border-b-0 border-black bg-[#e9e9e9] p-[0.2vh] align-middle font-medium',
                          )}
                        >
                          접수번호
                        </th>
                        <td
                          className={cn(
                            'w-40',
                            'border',
                            'border-b-0',
                            'border-black',
                            'text-center',
                          )}
                        >
                          {oneseo.submitCode}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div className={cn('flex', 'h-fit', 'border', 'border-black')}>
                  <div className={cn('flex', 'w-full', 'flex-col', 'border-r', 'border-black')}>
                    <div
                      className={cn('relative', 'z-10', 'border-b', 'border-black', 'bg-backslash')}
                    >
                      <div className={cn('h-[2.2vh]', 'text-right')}>학년</div>
                      <div className={cn('h-[2.2vh]', 'text-left')}>과목</div>
                    </div>
                    {[
                      ...GENERAL_SUBJECTS,
                      ...(oneseo.middleSchoolAchievement.newSubjects ?? []),
                    ].map((subject) => (
                      <div
                        key={subject}
                        className={cn(
                          'flex',
                          'items-center',
                          'justify-center',
                          'border-b',
                          'border-black',
                        )}
                      >
                        {subject}
                      </div>
                    ))}
                    <div className={cn('flex', 'items-center', 'justify-center')}>환산점</div>
                  </div>
                  <div
                    className={cn(
                      'flex',
                      'w-full',
                      'flex-col',
                      'border-b-0',
                      'border-r',
                      'border-black',
                    )}
                  >
                    <div className={cn('flex', 'flex-col')}>
                      <div
                        className={cn(
                          'h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold',
                        )}
                      >
                        1학년 1학기
                      </div>
                      <div
                        className={cn(
                          'h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold',
                        )}
                      >
                        성취도/평어
                      </div>
                    </div>
                    <div className={cn('h-full', 'bg-slash', 'bg-contain', 'bg-no-repeat')} />
                  </div>
                  <div className={cn('flex', 'w-full', 'flex-col', 'border-r', 'border-black')}>
                    <div className={cn('flex', 'flex-col')}>
                      <div
                        className={cn(
                          'h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold',
                        )}
                      >
                        1학년 2학기
                      </div>
                      <div
                        className={cn(
                          'h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold',
                        )}
                      >
                        성취도/평어
                      </div>
                    </div>
                    {!oneseo.calculatedScore.generalSubjectsScoreDetail.score1_2 ? (
                      <div className={cn('h-full', 'bg-slash', 'bg-contain', 'bg-no-repeat')} />
                    ) : (
                      <>
                        {oneseo.middleSchoolAchievement.achievement1_2!.map((score, i) => (
                          <div
                            key={i}
                            className={cn(
                              'flex',
                              'items-center',
                              'justify-center',
                              'border-b',
                              'border-black',
                            )}
                          >
                            {scoreToAlphabet[score]}
                          </div>
                        ))}
                        <div
                          className={cn(
                            'flex',
                            'items-center',
                            'justify-center',
                            'border-b-0',
                            'border-black',
                          )}
                        >
                          {oneseo.calculatedScore.generalSubjectsScoreDetail.score1_2}
                        </div>
                      </>
                    )}
                  </div>
                  <div className={cn('flex', 'w-full', 'flex-col', 'border-r', 'border-black')}>
                    <div className={cn('flex', 'flex-col')}>
                      <div
                        className={cn(
                          'h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold',
                        )}
                      >
                        2학년 1학기
                      </div>
                      <div
                        className={cn(
                          'h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold',
                        )}
                      >
                        성취도/평어
                      </div>
                    </div>
                    {!oneseo.calculatedScore.generalSubjectsScoreDetail.score2_1 ? (
                      <div className={cn('h-full', 'bg-slash', 'bg-contain', 'bg-no-repeat')} />
                    ) : (
                      <>
                        {oneseo.middleSchoolAchievement.achievement2_1!.map((score, i) => (
                          <div
                            key={i}
                            className={cn(
                              'flex',
                              'items-center',
                              'justify-center',
                              'border-b',
                              'border-black',
                            )}
                          >
                            {scoreToAlphabet[score]}
                          </div>
                        ))}
                        <div
                          className={cn(
                            'flex',
                            'items-center',
                            'justify-center',
                            'border-b-0',
                            'border-black',
                          )}
                        >
                          {oneseo.calculatedScore.generalSubjectsScoreDetail.score2_1}
                        </div>
                      </>
                    )}
                  </div>
                  <div className={cn('flex', 'w-full', 'flex-col', 'border-r', 'border-black')}>
                    <div className={cn('flex', 'flex-col')}>
                      <div
                        className={cn(
                          'h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold',
                        )}
                      >
                        2학년 2학기
                      </div>
                      <div
                        className={cn(
                          'h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold',
                        )}
                      >
                        성취도/평어
                      </div>
                    </div>
                    {!oneseo.calculatedScore.generalSubjectsScoreDetail.score2_2 ? (
                      <div className={cn('h-full', 'bg-slash', 'bg-contain', 'bg-no-repeat')} />
                    ) : (
                      <>
                        {oneseo.middleSchoolAchievement.achievement2_2!.map((score, i) => (
                          <div
                            key={i}
                            className={cn(
                              'flex',
                              'items-center',
                              'justify-center',
                              'border-b',
                              'border-black',
                            )}
                          >
                            {scoreToAlphabet[score]}
                          </div>
                        ))}
                        <div
                          className={cn(
                            'flex',
                            'items-center',
                            'justify-center',
                            'border-b-0',
                            'border-black',
                          )}
                        >
                          {oneseo.calculatedScore.generalSubjectsScoreDetail.score2_2}
                        </div>
                      </>
                    )}
                  </div>
                  <div className={cn('flex', 'w-full', 'flex-col', 'border-r', 'border-black')}>
                    <div className={cn('flex', 'flex-col')}>
                      <div
                        className={cn(
                          'h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold',
                        )}
                      >
                        3학년 1학기
                      </div>
                      <div
                        className={cn(
                          'h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold',
                        )}
                      >
                        성취도/평어
                      </div>
                    </div>
                    {!oneseo.calculatedScore.generalSubjectsScoreDetail.score3_1 ? (
                      <div className={cn('h-full', 'bg-slash', 'bg-contain', 'bg-no-repeat')} />
                    ) : (
                      <>
                        {oneseo.middleSchoolAchievement.achievement3_1!.map((score, i) => (
                          <div
                            key={i}
                            className={cn(
                              'flex',
                              'items-center',
                              'justify-center',
                              'border-b',
                              'border-black',
                            )}
                          >
                            {scoreToAlphabet[score]}
                          </div>
                        ))}
                        <div
                          className={cn(
                            'flex',
                            'items-center',
                            'justify-center',
                            'border-b-0',
                            'border-black',
                          )}
                        >
                          {oneseo.calculatedScore.generalSubjectsScoreDetail.score3_1}
                        </div>
                      </>
                    )}
                  </div>
                  <div className={cn('flex', 'w-full', 'flex-col', 'border-black')}>
                    <div className={cn('flex', 'flex-col')}>
                      <div
                        className={cn(
                          'h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold',
                        )}
                      >
                        3학년 2학기
                      </div>
                      <div
                        className={cn(
                          'h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold',
                        )}
                      >
                        성취도/평어
                      </div>
                    </div>
                    {oneseo.privacyDetail.graduationType === 'CANDIDATE' ||
                    !oneseo.calculatedScore.generalSubjectsScoreDetail.score3_2 ? (
                      <div className={cn('h-full', 'bg-slash', 'bg-contain', 'bg-no-repeat')} />
                    ) : (
                      <>
                        {oneseo.middleSchoolAchievement.achievement3_1!.map((score, i) => (
                          <div
                            key={i}
                            className={cn(
                              'flex',
                              'items-center',
                              'justify-center',
                              'border-b',
                              'border-black',
                            )}
                          >
                            {scoreToAlphabet[score]}
                          </div>
                        ))}
                        <div
                          className={cn(
                            'flex',
                            'items-center',
                            'justify-center',
                            'border-b-0',
                            'border-black',
                          )}
                        >
                          {oneseo.calculatedScore.generalSubjectsScoreDetail.score3_1}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <h2 className={cn('mt-[1.5vh]', 'text-[1.2vh]', 'leading-[2vh]')}>체육예술교과</h2>
                <div className={cn('flex', 'h-fit', 'border', 'border-black')}>
                  <div className={cn('flex', 'w-full', 'flex-col', 'border-r', 'border-black')}>
                    <div
                      className={cn('relative', 'z-10', 'border-b', 'border-black', 'bg-backslash')}
                    >
                      <div className={cn('h-[2.2vh]', 'text-right')}>학년</div>
                      <div className={cn('h-[2.2vh]', 'text-left')}>과목</div>
                    </div>
                    {[...ARTS_PHYSICAL_SUBJECTS].map((subject) => (
                      <div
                        key={subject}
                        className={cn(
                          'flex',
                          'items-center',
                          'justify-center',
                          'border-b',
                          'border-black',
                        )}
                      >
                        {subject}
                      </div>
                    ))}
                    <div className={cn('flex', 'items-center', 'justify-center')}>환산점</div>
                  </div>
                  <div className={cn('flex', 'w-full', 'flex-col', 'border-b-0', 'border-black')}>
                    <div className={cn('flex', 'flex-col')}>
                      <div
                        className={cn(
                          'h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold',
                        )}
                      >
                        1학년 1학기
                      </div>
                      <div
                        className={cn(
                          'h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold',
                        )}
                      >
                        성취도/평어
                      </div>
                    </div>
                    <div className={cn('h-full', 'bg-slash', 'bg-contain', 'bg-no-repeat')} />
                  </div>
                  {semesterArray.map((semester, idx) => (
                    <div
                      className={cn(
                        'flex',
                        'w-full',
                        'flex-col',
                        'border-b-0',
                        'border-l',
                        'border-black',
                      )}
                      key={semester}
                    >
                      <div className={cn('flex', 'flex-col')}>
                        <div
                          className={cn(
                            'h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold',
                          )}
                        >
                          {semester}
                        </div>
                        <div
                          className={cn(
                            'h-[2.2vh] border-b border-black bg-gray-200 p-[0.2vh] text-center font-bold',
                          )}
                        >
                          성취도/평어
                        </div>
                      </div>
                      {artPhysicalScores[idx] ? (
                        <>
                          <div
                            className={cn(
                              'flex',
                              'items-center',
                              'justify-center',
                              'border-b',
                              'border-black',
                            )}
                          >
                            {artPhysicalScores[idx]![0]}
                          </div>
                          <div
                            className={cn(
                              'flex',
                              'items-center',
                              'justify-center',
                              'border-b',
                              'border-black',
                            )}
                          >
                            {artPhysicalScores[idx]![1]}
                          </div>
                          <div
                            className={cn(
                              'flex',
                              'items-center',
                              'justify-center',
                              'border-b',
                              'border-black',
                            )}
                          >
                            {artPhysicalScores[idx]![2]}
                          </div>
                          <div className={cn('flex', 'items-center', 'justify-center')}>
                            {artPhysicalScores[idx]![3]}
                          </div>
                        </>
                      ) : (
                        <div className={cn('h-full', 'bg-slash', 'bg-contain', 'bg-no-repeat')} />
                      )}
                    </div>
                  ))}
                </div>
                <h2 className={cn('mt-[1.5vh]', 'text-[1.2vh]', 'leading-[2vh]')}>비교과</h2>
                <table className={cn('w-full', 'border-collapse', 'border', 'text-[1vh]')}>
                  <thead>
                    <tr>
                      <th
                        className={cn(
                          'border',
                          'border-black',
                          'bg-gray-200',
                          'p-[0.3vh]',
                          'font-bold',
                        )}
                        rowSpan={2}
                      >
                        학년
                      </th>
                      <th
                        className={cn(
                          'border',
                          'border-black',
                          'bg-gray-200',
                          'p-[0.3vh]',
                          'font-bold',
                        )}
                        colSpan={6}
                      >
                        미인정 출결 현황
                      </th>
                      <th
                        className={cn(
                          'border',
                          'border-black',
                          'bg-gray-200',
                          'p-[0.3vh]',
                          'font-bold',
                        )}
                        colSpan={2}
                      >
                        봉사활동
                      </th>
                    </tr>
                    <tr className={cn('text-center')}>
                      <td className={cn('border', 'border-black')}>결석</td>
                      <td className={cn('border', 'border-black')}>지각</td>
                      <td className={cn('border', 'border-black')}>조퇴</td>
                      <td className={cn('border', 'border-black')}>결과</td>
                      <td className={cn('border', 'border-black')}>환산일수</td>
                      <td className={cn('border', 'border-black')}>환산점</td>
                      <td className={cn('border', 'border-black')}>시간</td>
                      <td className={cn('border', 'border-black')}>환산점</td>
                    </tr>
                  </thead>
                  <tbody className={cn('text-center')}>
                    <tr>
                      <td className={cn('border', 'border-black')}>1</td>
                      {[
                        oneseo.middleSchoolAchievement.absentDays[0],
                        oneseo.middleSchoolAchievement.attendanceDays[0],
                        oneseo.middleSchoolAchievement.attendanceDays[3],
                        oneseo.middleSchoolAchievement.attendanceDays[6],
                      ].map((day, index) => (
                        <td className={cn('border', 'border-black')} key={day + ' ' + index}>
                          {day}
                        </td>
                      ))}
                      <td className={cn('border', 'border-black')} rowSpan={3}>
                        {oneseo.middleSchoolAchievement.absentDaysCount}
                      </td>
                      <td className={cn('border', 'border-black')} rowSpan={3}>
                        {oneseo.calculatedScore.attendanceScore}
                      </td>
                      <td className={cn('border', 'border-black')}>
                        {oneseo.middleSchoolAchievement.volunteerTime[0]}
                      </td>
                      <td className={cn('border', 'border-black')} rowSpan={3}>
                        {oneseo.calculatedScore.volunteerScore}
                      </td>
                    </tr>
                    <tr>
                      <td className={cn('border', 'border-black')}>2</td>
                      {[
                        oneseo.middleSchoolAchievement.absentDays[1],
                        oneseo.middleSchoolAchievement.attendanceDays[1],
                        oneseo.middleSchoolAchievement.attendanceDays[4],
                        oneseo.middleSchoolAchievement.attendanceDays[7],
                      ].map((day, index) => (
                        <td className={cn('border', 'border-black')} key={day + ' ' + index}>
                          {day}
                        </td>
                      ))}
                      <td className={cn('border', 'border-black')}>
                        {oneseo.middleSchoolAchievement.volunteerTime[1]}
                      </td>
                    </tr>
                    <tr>
                      <td className={cn('border', 'border-black')}>3</td>
                      {[
                        oneseo.middleSchoolAchievement.absentDays[2],
                        oneseo.middleSchoolAchievement.attendanceDays[2],
                        oneseo.middleSchoolAchievement.attendanceDays[5],
                        oneseo.middleSchoolAchievement.attendanceDays[8],
                      ].map((day, index) => (
                        <td className={cn('border', 'border-black')} key={day + ' ' + index}>
                          {day}
                        </td>
                      ))}
                      <td className={cn('border', 'border-black')}>
                        {oneseo.middleSchoolAchievement.volunteerTime[2]}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  className={cn(
                    'mx-auto',
                    'mt-[1.5vh]',
                    'w-[80%]',
                    'border-collapse',
                    'border',
                    'text-[1vh]',
                  )}
                >
                  <thead>
                    <tr>
                      <th
                        className={cn(
                          'border',
                          'border-black',
                          'bg-gray-200',
                          'p-[0.3vh]',
                          'font-bold',
                        )}
                        colSpan={4}
                      >
                        입력자 확인
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th
                        className={cn(
                          'border',
                          'border-black',
                          'bg-gray-200',
                          'p-[0.3vh]',
                          'font-bold',
                        )}
                      >
                        담임교사
                      </th>
                      <td className={cn('border', 'border-black', 'p-[0.3vh]', 'text-right')}>
                        (인)
                      </td>
                      <th
                        className={cn(
                          'border',
                          'border-black',
                          'bg-gray-200',
                          'p-[0.3vh]',
                          'font-bold',
                        )}
                      >
                        지원자
                      </th>
                      <td className={cn('border', 'border-black', 'p-[0.3vh]', 'text-right')}>
                        (인)
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  className={cn(
                    'mx-auto',
                    'mt-[1.5vh]',
                    'w-[50%]',
                    'border-collapse',
                    'border',
                    'text-[1vh]',
                  )}
                >
                  <thead>
                    <tr>
                      <th
                        className={cn(
                          'border',
                          'border-black',
                          'bg-gray-200',
                          'p-[0.3vh]',
                          'font-bold',
                        )}
                        rowSpan={2}
                      >
                        접수자 확인
                      </th>
                      <th
                        className={cn(
                          'border',
                          'border-black',
                          'bg-gray-200',
                          'p-[0.3vh]',
                          'font-bold',
                        )}
                      >
                        1차
                      </th>
                      <td className={cn('border', 'border-black', 'p-[0.3vh]', 'text-right')}>
                        (인)
                      </td>
                    </tr>
                    <tr>
                      <th
                        className={cn(
                          'border',
                          'border-black',
                          'bg-gray-200',
                          'p-[0.3vh]',
                          'font-bold',
                        )}
                      >
                        2차
                      </th>
                      <td className={cn('border', 'border-black', 'p-[0.3vh]', 'text-right')}>
                        (인)
                      </td>
                    </tr>
                  </thead>
                </table>
                <div className={cn('mt-[2vh]', 'text-center', 'text-[1.2vh]')}>
                  <p>위와 같이 입력하고 확인하였음을 증명합니다.</p>
                  <div className={cn('mb-4', 'flex', 'justify-center')}>
                    <p className={cn('mr-6')}>년</p>
                    <p className={cn('mr-6')}>월</p>
                    <p>일</p>
                  </div>
                  <div
                    className={cn('mt-[1vh]', 'flex', 'justify-between', 'text-[1vh]', 'text-sm')}
                  >
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
