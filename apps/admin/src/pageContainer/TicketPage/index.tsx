'use client';

import { ScreeningEnum } from 'types';
import { TicketType } from 'types';

import { PrintIcon } from 'shared/assets';
import { Button } from 'shared/components';
import {
  visionCampDate,
  passedMemberAnnounceDate,
  passedMemberSubmitDate,
  심층면접시험기간,
  직무적성시험기간,
} from 'shared/constants';

import { useGetAdmissionTickets } from 'api/hooks';

interface TicketPageProps {
  initialData: TicketType[];
}

const TicketPage = ({ initialData }: TicketPageProps) => {
  const { data: admissionTickets } = useGetAdmissionTickets({
    initialData: initialData,
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print:exact flex flex-col gap-4 bg-white pt-[4.16vh] print:pt-0">
      {admissionTickets?.map((ticket, i) => (
        <div
          key={ticket.oneseoSubmitCode}
          className={`mx-auto h-[31.64vh] w-[920px] font-normal text-black ${
            i % 2 !== 0 ? 'mb-[27.14vh] mt-[8.32vh]' : ''
          }`}
        >
          <table className="h-full w-full border-collapse text-center text-[0.75rem] font-light leading-[1.25rem]">
            <tbody>
              <tr>
                <td className="w-[55vw] border border-black text-[20px] font-normal" colSpan={2}>
                  수험자 안내사항
                </td>
                <td className="w-[45vw] border border-black text-[20px] font-normal" colSpan={3}>
                  수 험 표
                </td>
              </tr>
              <tr>
                <td className="font-normal border border-black w-28">
                  2-1차 전형 <br />
                  (직무적성소양평가)
                </td>
                <td className="border border-black pl-[0.625rem] text-left font-normal">
                  {직무적성시험기간}
                </td>

                <td rowSpan={6} className="h-[200px] w-[150px] border border-black">
                  {ticket.profileImg && (
                    <img
                      src={ticket.profileImg}
                      alt="증명사진 오류"
                      className="block w-full h-full"
                    />
                  )}
                </td>
                <td
                  rowSpan={2}
                  className="w-[10%] border border-black bg-[#e9e9e9] font-medium font-normal"
                >
                  접수번호
                </td>
                <td rowSpan={2} className="font-normal border border-black">
                  {ticket.oneseoSubmitCode}
                </td>
              </tr>
              <tr>
                <td className="font-normal border border-black w-28">
                  2-2차 전형 <br />
                  (심층면접)
                </td>
                <td className="border border-black pl-[0.625rem] text-left font-normal">
                  {심층면접시험기간}
                </td>
              </tr>
              <tr>
                <td rowSpan={2} className="font-normal border border-black">
                  합격자 발표
                </td>
                <td className="border border-black pl-[0.625rem] text-left font-normal">
                  본교 홈페이지
                </td>
                <td className="border border-black bg-[#e9e9e9] font-medium font-normal">성명</td>
                <td className="border border-black">{ticket.memberName}</td>
              </tr>
              <tr>
                <td className="border border-black pl-[0.625rem] text-left font-normal">
                  {passedMemberAnnounceDate}
                </td>
                <td
                  className="border border-black bg-[#e9e9e9] font-medium font-normal"
                  rowSpan={2}
                >
                  생년월일
                </td>
                <td className="font-normal border border-black" rowSpan={2}>
                  {ticket.memberBirth}
                </td>
              </tr>
              <tr>
                <td rowSpan={2} className="font-normal border border-black">
                  합격자 등록 및<br /> 서류 제출
                </td>
                <td className="border border-black pl-[0.625rem] text-left font-normal">
                  공문 및 방문 제출
                </td>
              </tr>
              <tr>
                <td className="border border-black pl-[0.625rem] text-left font-normal">
                  {passedMemberSubmitDate.startDate} ~ {passedMemberSubmitDate.endDate} <br />
                  09:00 ~ 17:00 (토·일요일 제외, <br />
                  마감시간 이전 도착분에 한하여 유효함.)
                </td>
                <td className="border border-black bg-[#e9e9e9] font-medium font-normal">
                  출신학교
                </td>
                {ticket.schoolName ? (
                  <td className="border border-black">{ticket.schoolName}</td>
                ) : (
                  <td className='bg-[url(&apos;data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray" /></svg>&apos;)] border border-black' />
                )}
              </tr>
              <tr>
                <td className="font-normal border border-black">합격자 서류</td>
                <td className="border border-black pl-[0.625rem] text-left font-normal">
                  공고문 참조
                </td>
                <td
                  colSpan={2}
                  className="border border-black bg-[#e9e9e9] font-medium font-normal"
                >
                  전형구분
                </td>
                <td className="font-normal border border-black">
                  {ScreeningEnum[ticket.appliedScreening]}
                </td>
              </tr>
              <tr>
                <td className="font-normal border border-black">신입생 비전캠프</td>
                <td className="border border-black pl-[0.625rem] text-left font-normal">
                  {visionCampDate.startDate} ~ {visionCampDate.endDate} 예정
                </td>
                <td
                  rowSpan={2}
                  colSpan={2}
                  className="border border-black pl-2 pr-[0.625rem] text-left font-normal"
                >
                  위 사람은 2024학년도 <br /> 본교 신입생 입학전형 지원자임을 확인함.
                  <p className="pr-[0.625rem] text-center font-normal">2023년 10월 27일</p>
                  <p>광주소프트웨어마이스터고등학교장 [직인생략]</p>
                </td>
                <td className="border border-black bg-[#e9e9e9] font-medium font-normal">접수자</td>
              </tr>
              <tr>
                <td colSpan={2} className="border border-black pl-[0.625rem] text-left font-normal">
                  * 공지 사항: 홈페이지(gsm.gen.hs.kr)-입학 안내 <br />* 문의:062-949-6800
                </td>
                <td className="font-normal border border-black">(인)</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <Button
        className="fixed items-center gap-2 bottom-10 right-10 print:hidden"
        onClick={handlePrint}
      >
        <PrintIcon />
        <p className="text-[2.1vh] font-bold hover:text-white">인쇄하기</p>
      </Button>
    </div>
  );
};

export default TicketPage;
