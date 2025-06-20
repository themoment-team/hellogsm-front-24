import { FooterGSMLogo } from 'client/assets';

import { cn } from 'shared/lib/utils';

const LINKS = [
  {
    text: '개인정보처리방침',
    link: 'https://official.hellogsm.kr/policy/privacy',
  },
  {
    text: '영상정보처리기기운영·관리방침',
    link: 'https://official.hellogsm.kr/policy/cctv',
  },
  {
    text: '저작권신고 및 보호규정',
    link: 'https://official.hellogsm.kr/policy/copyright',
  },
  {
    text: '찾아오시는 길',
    link: 'https://official.hellogsm.kr/about/location',
  },
] as const;

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn([
        'bg-gray-100',
        'py-15',
        'relative',
        'flex',
        'items-center',
        'justify-center',
        'p-[3.75rem]',
        'sm:px-[6.25rem]',
        '2xl:px-[12.5rem]',
        'w-full',
      ])}
    >
      <div
        className={cn([
          'flex',
          'items-start',
          'sm:items-center',
          'w-full',
          'gap-10',
          'sm:gap-0',
          'max-w-[77.5rem]',
          'justify-between',
          'sm:flex-row',
          'flex-col',
        ])}
      >
        <FooterGSMLogo />
        <div className={cn('flex', 'flex-col', 'items-start', 'gap-16', 'md:items-start')}>
          <div
            className={cn([
              'flex',
              'flex-col',
              'items-start',
              'sm:items-end',
              'gap-2',
              'text-white',
              'md:items-start',
            ])}
          >
            <p
              className={cn([
                'w-full',
                'text-left',
                'sm:text-right',
                'font-normal',
                'text-slate-600',
              ])}
            >
              ©{year} Copyright 광주소프트웨어마이스터고등학교 &nbsp;
              <br className={cn('sm:hidden')} />
              ALL RIGHTS RESERVED.
            </p>
            <div className={cn('flex', 'gap-2', 'sm:flex-row', 'flex-col', 'sm:gap-6')}>
              {LINKS.map(({ text, link }) => (
                <a
                  key={text}
                  href={link}
                  className={cn('text-h5', 'font-bold', 'text-slate-600')}
                  target="_blank"
                  rel="noreferrer"
                >
                  {text}
                </a>
              ))}
            </div>
          </div>
          <p
            className={cn([
              'text-body2',
              'w-full',
              'text-right',
              'font-normal',
              'text-slate-400',
              'hidden',
              'sm:block',
            ])}
          >
            우) 62423 광주광역시 광산구 상무대로 312
            <br />
            교무실 062)949-6800(08:30~16:30) 행정실 062)949-6806(08:30~16:30)
            <br />
            팩스 062)949-6877 당직실 062)949-6899(평일야간, 휴일)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
