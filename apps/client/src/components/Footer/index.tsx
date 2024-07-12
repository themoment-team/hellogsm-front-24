import Link from 'next/link';

import { FooterGSMLogo } from 'client/assets';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sub-navy py-15 relative flex items-center justify-center px-[12.5rem]">
      <div className="flex w-full max-w-[77.5rem] items-center justify-between">
        <FooterGSMLogo />
        <div className="flex flex-col items-start gap-16 md:items-start">
          <div className="flex flex-col items-end gap-2 text-white md:items-start">
            <p className="w-full text-right font-normal">
              ©{year} Copyright 광주소프트웨어마이스터고등학교 ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-6">
              <Link href="/policy/privacy" className="text-h5 font-bold">
                개인정보처리방침
              </Link>
              <Link href="/policy/cctv" className="text-h5 font-bold">
                영상정보처리기기운영·관리방침
              </Link>
              <Link href="/policy/copyright" className="text-h5 font-bold">
                저작권신고 및 보호규정
              </Link>
              <Link href="/about/location" className="text-h5 font-bold">
                찾아오시는 길
              </Link>
            </div>
          </div>
          <p className="text-body2 w-full text-right font-normal text-white/60">
            우) 62423 광주광역시 광산구 상무대로 312
            <br />
            교무실 062)949-6800(08:30~16:30) 행정실 062)949-6806(08:30~16:30)
            <br />
            팩스 062)941-7545 당직실 062)949-6899(평일야간, 휴일)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
