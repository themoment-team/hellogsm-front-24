import { GetMyOneseoType, GraduationEnum, ScreeningEnum } from 'types';
import { formatMajor } from 'utils/Format';

interface OneseoStatusType {
  oneseo: GetMyOneseoType;
}

const OneseoStatus = ({ oneseo }: OneseoStatusType) => {
  return (
    <table className="mx-auto w-full border-collapse text-center text-[1.2vh] leading-[2.2vh]">
      <tbody>
        <tr>
          <td
            className="h-[26vh] w-[3%] border border-black bg-[#e9e9e9] p-[0.2vh] align-middle font-medium"
            rowSpan={9}
          >
            지원자 현황
          </td>
        </tr>
        <tr>
          <td
            className="border border-black bg-[#e9e9e9] p-[0.2vh] align-middle font-medium"
            colSpan={2}
            rowSpan={2}
          >
            출신중학교
          </td>
          {oneseo.privacyDetail.schoolName ? (
            <td className="border border-black" colSpan={2}>
              {oneseo.privacyDetail.schoolName}
            </td>
          ) : (
            <td
              className='bg-[url(&apos;data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray" /></svg>&apos;)] bg-center bg-no-repeat'
              colSpan={2}
            />
          )}
          <td className="border border-black" colSpan={6}>
            {GraduationEnum[oneseo.privacyDetail.graduationType]}
          </td>
        </tr>
        <tr>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] align-middle font-medium">
            지역명
          </td>
          {oneseo.privacyDetail.schoolAddress ? (
            <td className="border border-black" colSpan={7}>
              {oneseo.privacyDetail.schoolAddress}
            </td>
          ) : (
            <td
              className='bg-[url(&apos;data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray" /></svg>&apos;)] bg-center bg-no-repeat'
              colSpan={7}
            />
          )}
        </tr>
        <tr>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium" colSpan={9}>
            전 형 구 분
          </td>
        </tr>
        <tr>
          <td className="border border-black" colSpan={9}>
            {ScreeningEnum[oneseo.wantedScreening]}
          </td>
        </tr>
        <tr>
          <td
            className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium"
            rowSpan={2}
            style={{ width: '10%' }}
          >
            교과 <br /> 성적
          </td>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium">1-1</td>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium">1-2</td>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium">2-1</td>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium">2-2</td>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium">3-1</td>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium">예체능</td>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium">소계</td>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium" rowSpan={2}>
            합계 (환산총점)
          </td>
        </tr>
        <tr>
          {[
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
            [3, 1],
          ].map((v) => {
            const gradeKey = `grade${v[0]}Semester${v[1]}Score` as keyof typeof admissionGrade;

            return oneseo.middleSchoolAchievement.gedTotalScore ||
              admissionGrade?.[gradeKey] === 0 ? (
              <td
                key={gradeKey}
                className='bg-[url(&apos;data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray" /></svg>&apos;)] bg-center bg-no-repeat'
              />
            ) : (
              <td key={gradeKey} className="border border-black">
                {admissionGrade?.[gradeKey]}
              </td>
            );
          })}
          {isGEDScore ? (
            <td className='bg-[url(&apos;data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray" /></svg>&apos;)] bg-center bg-no-repeat' />
          ) : (
            <td className="border border-black">{admissionGrade?.artisticScore}</td>
          )}
          <td className="border border-black">
            {isGEDScore ? admissionGrade?.gedTotalScore : admissionGrade?.curricularSubtotalScore}
          </td>
        </tr>
        <tr>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium" rowSpan={2}>
            비교과 <br /> 성적
          </td>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium" colSpan={3}>
            출석
          </td>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium" colSpan={3}>
            봉사활동
          </td>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium">소계</td>
          <td className="border border-black" colSpan={2} rowSpan={2}>
            {admissionGrade?.totalScore}
          </td>
        </tr>
        <tr>
          {isGEDScore || admissionGrade?.attendanceScore === 0 ? (
            <td
              className='bg-[url(&apos;data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray" /></svg>&apos;)] bg-center bg-no-repeat'
              colSpan={3}
            />
          ) : (
            <td className="border border-black" colSpan={3}>
              {admissionGrade?.attendanceScore}
            </td>
          )}
          {isGEDScore || admissionGrade?.volunteerScore === 0 ? (
            <td
              className='bg-[url(&apos;data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray" /></svg>&apos;)] bg-center bg-no-repeat'
              colSpan={3}
            />
          ) : (
            <td className="border border-black" colSpan={3}>
              {admissionGrade?.volunteerScore}
            </td>
          )}
          <td className="border border-black">
            {isGEDScore
              ? admissionGrade?.gedMaxScore
              : admissionGrade?.extracurricularSubtotalScore}
          </td>
        </tr>
        <tr>
          <td
            className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium"
            rowSpan={4}
            colSpan={2}
            style={{ height: '7vh' }}
          >
            지원구분
          </td>
        </tr>
        <tr>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium" colSpan={3}>
            1지망 학과
          </td>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium" colSpan={3}>
            2지망 학과
          </td>
          <td className="border border-black bg-[#e9e9e9] p-[0.2vh] font-medium" colSpan={3}>
            3지망 학과
          </td>
        </tr>
        <tr>
          <td className="border border-black" colSpan={3}>
            {formatMajor(admissionInfo?.desiredMajor.firstDesiredMajor)}
          </td>
          <td className="border border-black" colSpan={3}>
            {formatMajor(admissionInfo?.desiredMajor.secondDesiredMajor)}
          </td>
          <td className="border border-black" colSpan={3}>
            {formatMajor(admissionInfo?.desiredMajor.thirdDesiredMajor)}
          </td>
        </tr>
        <tr>
          <td className="border border-black" colSpan={9} style={{ textAlign: 'start' }}>
            1.(인공지능과/ 스마트IoT과/ 소프트웨어개발과) 중 지망 학과를 순서대로 기록. <br />
            2. 지원학과는 희망 순에 따라 3개 학과를 모두 기록해야 함.
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OneseoStatus;
