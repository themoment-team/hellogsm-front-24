'use client';

import Link from 'next/link';

import * as I from 'client/assets';
import { RECRUITMENT_PERIOD } from 'client/constants';
import { cn } from 'client/lib/utils';

const Section3 = () => {
  const buttonStyle = [
    'font-semibold rounded-3xl border border-white px-[1.125rem] py-[0.375rem] text-white',
  ] as const;

  return (
    <div className={cn('w-full', 'bg-white', 'relative', 'py-[11.25rem]')}>
      <div className={cn('container mx-auto flex justify-between px-32')}>
        <div className={cn('text-left')}>
          <h1 className={cn('text-2xl font-semibold text-gray-900')}>
            광주소프트웨어마이스터고등학교
            <br />
            2025 신입생 모집
          </h1>
          <p className={cn('mb-[2rem] mt-[1rem] text-gray-500')}>
            접수기간: {RECRUITMENT_PERIOD.startDate} {RECRUITMENT_PERIOD.endDate}
          </p>
          <Link
            href="/"
            className={cn(...buttonStyle, 'text-sky-900', 'border-sky-900', 'px-4', 'py-[9px]')}
          >
            원서접수 바로가기
          </Link>
        </div>
        <div className={cn('h-full w-[43.5625rem] text-white')}>
          <div className={cn('grid grid-cols-6 grid-rows-3 gap-[0.75rem]', 'min-h-[39rem]')}>
            <div className={cn('col-span-2 row-span-1 rounded-3xl bg-lime-400 p-6')}>
              <div className={cn('flex h-full w-full items-center justify-center')}>
                <I.StarIcon />
              </div>
            </div>
            <div
              className={cn(
                'col-span-4 row-span-1 flex flex-col justify-between rounded-3xl bg-sky-800 p-6',
              )}
            >
              <p className={cn('self-start text-xl font-medium text-white')}>
                최종 합격 하려면 중학교 내신 성적이
                <br /> 최소 몇 %가 되어야 할까?&nbsp; 🤷🏻‍♀️
              </p>
              <Link href="/" className={cn(...buttonStyle, 'self-end')}>
                FAQ 바로가기
              </Link>
            </div>

            <div
              className={cn(
                'col-span-3 row-span-1 flex flex-col justify-between rounded-3xl bg-sky-400 p-6',
              )}
            >
              <div>
                <p className={cn('self-start pt-[0.25rem] text-xl font-medium')}>
                  여러 계정으로 로그인 하는 방법 🚦
                </p>
                <p className={cn('font-400 self-start text-sm')}>
                  여러 계정으로 로그인 하는 방법을 알려드릴게요!
                </p>
              </div>
              <Link href="/" className={cn(...buttonStyle, 'self-end')}>
                바로가기
              </Link>
            </div>
            <div
              className={cn(
                'col-span-3 row-span-1 flex flex-col justify-between rounded-3xl bg-[#3A4959] p-6',
              )}
              style={{
                // eslint-disable-next-line quotes
                background: "url('/images/Pattern.png') center / 150% no-repeat",
              }}
            >
              <div>
                <p className={cn('self-start text-xl font-medium')}>모의 성적 계산하기</p>
                <p className={cn('font-400 self-start text-sm')}>
                  본격적인 원서접수 전, 모의 성적을
                  <br />
                  계산해 보세요!
                </p>
              </div>
              <Link href="/" className={cn(...buttonStyle, 'self-end')}>
                바로가기
              </Link>
            </div>
            <div
              className={cn(
                'col-span-4 row-span-1 flex flex-col justify-between rounded-3xl bg-sky-800 p-6',
              )}
            >
              <div>
                <I.Star3Icon />
                <p className={cn('self-start pt-[0.5rem] text-xl font-medium text-white')}>
                  광주소프트웨어마이스터고등학교 🏫
                </p>
                <p className={cn('font-400 self-start pt-[1.9375rem] text-sm text-white')}>
                  인성과 감성으로 감동을 만드는 광주소프트웨어마이스터고등학교!
                  <br />
                  입학 지원 서비스 Hello, GSM을 통해 지금 바로 지원해보세요!
                </p>
              </div>
            </div>
            <div className={cn('col-span-2 row-span-1 rounded-3xl bg-lime-400 p-6')}>
              <div className={cn('flex h-full w-full items-center justify-center')}>
                <I.Star2Icon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;