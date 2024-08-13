'use client';

import * as I from 'client/assets';
import { cn } from 'client/lib/utils';

const Section3 = () => {
  const buttonStyle = [
    'rounded-3xl border border-white px-[18px] py-[6px] font-[600] text-white',
  ] as const;

  return (
    <div className={cn('w-full', 'bg-white', 'relative', 'py-[11.25rem]')}>
      <div className={cn('container mx-auto flex justify-between px-32')}>
        {/* Main Section */}
        <div className={cn('text-left')}>
          <h1 className={cn('text-2xl font-semibold text-gray-900')}>
            광주소프트웨어마이스터고등학교
            <br />
            2025 신입생 모집
          </h1>
          <p className={cn('mt-2 text-gray-500')}>
            접수기간: 2024.10.10. (월) 오전 9시 ~ 오후 4시까지
          </p>
          <button
            className={cn(
              'mt-6',
              'px-4',
              'py-2',
              'bg-white',
              'text-sky-900',
              'border',
              'border-sky-900',
              'rounded-lg',
              'hover:bg-blue-500',
              'hover:text-white',
              'transition',
              'duration-300',
              'ease-in-out',
              'rounded-3xl',
            )}
          >
            원서접수 바로가기
          </button>
        </div>
        {/* Grid Section */}
        <div className={cn('h-full w-[625px] text-white')}>
          <div className={cn('grid grid-cols-7 grid-rows-1 gap-[12px]')}>
            <div className={cn('col-span-2 row-span-2 rounded-3xl bg-lime-400 p-6')}>
              <div className={cn('flex h-full w-full items-center justify-center')}>
                <I.StarIcon />
              </div>
            </div>

            <div
              className={cn(
                'col-span-4 row-span-2 flex flex-col items-start justify-between self-stretch rounded-3xl bg-sky-900 px-[32px] py-[25px]',
              )}
            >
              <p className={cn('text-xl font-medium text-white')}>
                최종 합격 하려면 중학교 내신 성적이
                <br /> 최소 몇 %가 되어야 할까? 🤷🏻‍♀️
              </p>
              <button className={cn(...buttonStyle)}>FAQ 바로가기</button>
            </div>

            <div className={cn('col-span-3 row-span-1 rounded-3xl bg-sky-400 p-6')}>
              <p className={cn('text-xl font-medium')}>여러 계정으로 로그인 하는 방법</p>
              <p className={cn('font-400 text-sm')}>
                여러 계정으로 로그인 하는 방법을 알려드릴게요!
              </p>
              <button className={cn(...buttonStyle)}>바로가기</button>
            </div>

            <div className={cn('col-span-3 row-span-1 rounded-3xl bg-gray-300 p-6')}>
              <p className={cn('text-xl font-medium')}>모의 성적 계산하기</p>
              <p className={cn('font-400 text-sm')}>
                본격적인 원서접수 전, 모의 성적을 계산해 보세요!
              </p>
              <button className={cn(...buttonStyle)}>바로가기</button>
            </div>

            <div className={cn('col-span-4 row-span-1 rounded-3xl bg-sky-900 p-6')}>
              <p className={cn('text-xl font-medium text-white')}>
                광주소프트웨어마이스터고등학교 🏫
              </p>
              <p className={cn('font-400 text-sm text-white')}>
                인성과 감성으로 감동을 만드는 광주소프트웨어마이스터고등학교! 입학 지원 서비스
                Hello, GSM을 통해 지금 바로 지원해보세요!
              </p>
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
