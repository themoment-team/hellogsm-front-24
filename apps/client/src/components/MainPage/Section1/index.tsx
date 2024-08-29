'use client';

import { useRouter } from 'next/navigation';

import { BottomArrow } from 'client/assets';
import { RECRUITMENT_PERIOD } from 'client/constants';

import { cn } from 'shared/lib/utils';
import { scrollToElement } from 'shared/utils';

import Video from './Video';

const flexColStyle = ['flex', 'flex-col', 'items-center'];

const Section1 = () => {
  const { push } = useRouter();

  const scrollToSection2 = () => {
    scrollToElement('#section2');
  };

  return (
    <section
      className={cn(
        'h-[calc(100vh-4.625rem)]',
        'w-full',
        'relative',
        'top-0',
        'z-0',
        'flex',
        'justify-center',
        'bg-black',
      )}
    >
      <Video />
      <div
        className={cn(
          'w-full',
          'h-full',
          'bg-[rgb(0_0_0_/_0.40)]',
          'absolute',
          'top-0',
          'z-[2]',
          'flex',
          'items-center',
          'justify-center',
        )}
      >
        <div className={cn(...flexColStyle, 'gap-14')}>
          <div className={cn(...flexColStyle, 'gap-6')}>
            <h1
              className={cn(
                'w-[49.0625rem]',
                'text-center',
                'text-[3.25rem]',
                'font-bold',
                'text-white',
              )}
            >
              꿈🌟과 끼🤘🏻를 마음껏{' '}
              <span
                className={cn(
                  'relative',
                  'before:absolute',
                  'before:-top-[2.625rem]',
                  'before:left-2',
                  'before:text-lime-400',
                  'before:tracking-[0.8125rem]',
                  'text-sky-300',
                  'before:text-[2.5rem]',
                  // eslint-disable-next-line quotes
                  "before:content-['••']",
                )}
              >
                UP
              </span>{' '}
              시킬 수 있는 광주소프트웨어마이스터고등학교
            </h1>

            <p className={cn('text-2xl', 'font-normal', 'text-white')}>
              접수기간 : {RECRUITMENT_PERIOD.startDate} {RECRUITMENT_PERIOD.endDate}
            </p>
          </div>

          <button
            onClick={() => {
              push('/guide');
            }}
            className={cn(
              'text-[#F7F7F7]',
              'text-2xl',
              'font-bold',
              'px-10',
              'py-4',
              'rounded-full',
              'border',
              'border-white',
              'border-solid',
            )}
          >
            원서접수 하러 가기
          </button>
        </div>
      </div>

      <div className={cn('absolute', 'bottom-14', ...flexColStyle, 'gap-1', 'z-[3]')}>
        <p
          onClick={scrollToSection2}
          className={cn('text-lg', 'text-2xl', 'text-white', 'cursor-pointer')}
        >
          GSM 더 알아보기
        </p>
        <div onClick={scrollToSection2} className={cn('animate-bounce', 'cursor-pointer')}>
          <BottomArrow />
        </div>
      </div>
    </section>
  );
};

export default Section1;
