'use client';

import { ScreeningEnum } from 'types';
import { TicketType } from 'types';

import { TicketsPrintIcon } from 'admin/assets';

import { useGetAdmissionTickets } from 'api/hooks';

interface TicketPageProps {
  initialData: TicketType[] | undefined;
}

const TicketPage = ({ initialData }: TicketPageProps) => {
  const { data: admissionTickets } = useGetAdmissionTickets({
    initialData: initialData,
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print:exact bg-white pt-[4.16vh] print:pt-0">
      {admissionTickets?.map((ticket, i) => (
        <div
          key={ticket.oneseoSubmitCode}
          className={`mx-auto mb-[26.97vh] h-[31.64vh] w-[63vh] ${
            i % 2 !== 0 ? 'mb-[27.14vh] mt-[8.32vh]' : ''
          }`}
        >
          <table className="h-full w-full border-collapse text-center text-[0.75rem] font-light leading-[1.25rem]">
            <tbody>
              <tr>
                <td className="w-[55%]" colSpan={2}>
                  수험자 안내사항
                </td>
                <td className="w-[45%]" colSpan={3}>
                  수 험 표
                </td>
              </tr>
              <tr>
                <td className="border border-black">2차 전형 (직무적성소양평가)</td>
                <td className="border border-black pl-[0.625rem] text-left">
                  2023. 10. 27.(금) 13:00 ~ 16:10
                </td>
                <td rowSpan={6} className="w-[20%] border border-black">
                  {ticket.profileImg && (
                    <img
                      src={
                        // 현재 프로필 이미지가 정상적이지 않아 예시 이미지를 넣었습니다. TODO 제거
                        ticket.profileImg === 'https://asd'
                          ? 'https://cdn.hankyung.com/photo/201904/01.19372617.1.jpg'
                          : ticket.profileImg
                      }
                      alt="증명사진 오류"
                      className="block w-full h-full"
                    />
                  )}
                </td>
                <td className="w-[10%] border border-black bg-[#e9e9e9] font-medium">접수번호</td>
                <td className="border border-black">{ticket.oneseoSubmitCode}</td>
              </tr>
              <tr>
                <td rowSpan={2} className="border border-black">
                  합격자 발표
                </td>
                <td className="border border-black pl-[0.625rem] text-left">본교 홈페이지</td>
                <td className="border border-black bg-[#e9e9e9] font-medium">성명</td>
                <td className="border border-black">{ticket.memberName}</td>
              </tr>
              <tr>
                <td className="border border-black pl-[0.625rem] text-left">
                  2023. 11. 1.(수) 10:00
                </td>
                <td className="border border-black bg-[#e9e9e9] font-medium" rowSpan={2}>
                  생년월일
                </td>
                <td className="border border-black" rowSpan={2}>
                  {ticket.memberBirth}
                </td>
              </tr>
              <tr>
                <td rowSpan={2} className="border border-black">
                  합격자 등록 및 서류 제출
                </td>
                <td className="border border-black pl-[0.625rem] text-left">공문 및 방문 제출</td>
              </tr>
              <tr>
                <td className="border border-black pl-[0.625rem] text-left">
                  2023. 11. 1.(수) ~ 2023. 11. 6.(월) <br />
                  09:00 ~ 17:00 (토·일요일 제외, <br />
                  마감시간 이전 도착분에 한하여 유효함.)
                </td>
                <td className="border border-black bg-[#e9e9e9] font-medium">출신학교</td>
                {ticket.schoolName ? (
                  <td className="border border-black">{ticket.schoolName}</td>
                ) : (
                  <td className='bg-[url(&apos;data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray" /></svg>&apos;)] border border-black' />
                )}
              </tr>
              <tr>
                <td className="border border-black">합격자 서류</td>
                <td className="border border-black pl-[0.625rem] text-left">공고문 참조</td>
                <td className="border border-black bg-[#e9e9e9] font-medium">전형구분</td>
                <td className="border border-black">{ScreeningEnum[ticket.appliedScreening]}</td>
              </tr>
              <tr>
                <td className="border border-black">신입생 비전캠프</td>
                <td className="border border-black pl-[0.625rem] text-left">
                  2024. 1. 10.(수) ~ 2024. 1. 12.(금) 예정
                </td>
                <td
                  rowSpan={2}
                  colSpan={2}
                  className="border border-black pr-[0.625rem] text-right"
                >
                  위 사람은 2024학년도 <br /> 본교 신입생 입학전형 지원자임을 확인함.
                  <p className="pr-[0.625rem] text-right">2023년 10월 27일</p>
                  <p>
                    광주소프트웨어마이스터고등학교장 <br /> [직인생략]
                  </p>
                </td>
                <td className="border border-black bg-[#e9e9e9] font-medium">접수자</td>
              </tr>
              <tr>
                <td colSpan={2} className="border border-black pl-[0.625rem] text-left">
                  * 공지 사항: 홈페이지(gsm.gen.hs.kr)-입학 안내 <br />* 문의:062-949-6800
                </td>
                <td className="border border-black">(인)</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <button
        onClick={handlePrint}
        className="fixed bottom-[9vh] right-[9vh] z-10 flex h-[6.5vh] w-[17vh] cursor-pointer items-center justify-between rounded-[0.7vh] border-none bg-white p-[1.8vh] pr-[2.5vh] shadow-[0.3vh_0.3vh_0.5vh_rgba(0,0,0,0.21)] hover:bg-black hover:transition-colors hover:duration-500 print:hidden"
      >
        <TicketsPrintIcon />
        <p className="text-[2.1vh] font-bold hover:text-white">인쇄하기</p>
      </button>
    </div>
  );
};

export default TicketPage;
