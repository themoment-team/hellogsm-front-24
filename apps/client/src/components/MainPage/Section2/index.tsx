'use client';

import {
  Section2Icon1,
  Section2Icon2,
  Section2Icon3,
  Section2Icon4,
  Section2Icon5,
  Section2Icon6,
} from 'client/assets';
import { cn } from 'client/lib/utils';

const stepsData = [
  {
    icon: <Section2Icon1 />,
    title: '원서 및 성적 입력',
    date: (
      <>
        2024. 10. 14.(월)~
        <br className={cn('lg:hidden', 'smx:block', 'hidden')} />
        17.(목) 09:00 ~ 17:00
      </>
    ),
    color: 'border-lime-500',
  },
  {
    icon: <Section2Icon2 />,
    title: '입학원서 및 증빙서류 제출',
    date: (
      <>
        2024. 10. 14.(월)~
        <br className={cn('lg:hidden', 'smx:block', 'hidden')} />
        17.(목) 09:00 ~ 17:00
      </>
    ),
    color: 'border-sky-400',
  },
  {
    icon: <Section2Icon3 />,
    title: '1차 전형 합격자 발표',
    date: '2024. 10. 21.(월) 10:00',
    color: 'border-sky-600',
  },
  {
    icon: <Section2Icon4 />,
    title: '2차전형(직무적성 소양평가)',
    date: '2024. 10. 25.(금) 13:00-16:30',
    color: 'border-lime-500',
  },
  {
    icon: <Section2Icon5 />,
    title: '2차 전형(심층 면접)',
    date: '2024. 10. 26.(토) 09:00-17:00',
    color: 'border-sky-600',
  },
  {
    icon: <Section2Icon6 />,
    title: '최종합격자 발표',
    date: '2024. 10. 30.(수) 10:00',
    color: 'border-lime-500',
  },
  {
    icon: <Section2Icon2 />,
    title: '합격자 등록(서류 제출)',
    date: (
      <>
        2024. 10. 30.(수) ~
        <br className={cn('lg:hidden', 'smx:block', 'hidden')} />
        11. 4.(월) 09:00 ~ 17:00
        <br />
        (건강검진 관련서류 제출: 11. 11.(월) 17:00까지)
      </>
    ),
    color: 'border-sky-400',
  },
];

const Section2 = () => {
  return (
    <div
      id="section2"
      className={cn('w-full', 'bg-white', 'relative', 'py-[11.25rem]', 'overflow-hidden')}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'justify-between',
          'items-center',
          'gap-6',
          'smx:gap-[5.125rem]',
          'lg:gap-[7.5rem]',
        )}
      >
        <div
          className={cn(
            'flex',
            'flex-col',
            'items-left',
            'w-full',
            'gap-4',
            'smx:gap-4',
            'px-[3.75rem]',
            'md:px-[8rem]',
            'xl:px-[16rem]',
            'fhd:px-[20rem]',
            'uhd:px-[32.5rem]',
          )}
        >
          <h1
            className={cn(
              'text-[#0F2E4D]',
              'font-semibold',
              'text-center',
              'smx:text-left',
              'text-[1.25rem]/[1.25rem]',
              'xs:text-[1.5rem]/[2rem]',
              'sm:text-[2rem]/[2.5rem]',
            )}
          >
            광주소프트웨어마이스터고등학교
            <br />
            2025 신입생 모집절차
          </h1>
          <p
            className={cn(
              'text-gray-600',
              'font-normal',
              'text-[1rem]/[1.5rem]',
              'text-center',
              'smx:text-left',
            )}
          >
            우리 학교에 입학하기 위해 필요한 절차를 소개해드릴게요!
          </p>
          <div
            className={cn(
              'justify-around',
              'mt-[7.5rem]',
              'grid',
              'grid-cols-4',
              'relative',
              'hidden',
              'smx:flex',
            )}
          >
            {stepsData.slice(0, 4).map((step, index) => (
              <div
                key={index}
                className={cn('flex', 'w-[17rem]', 'flex-col', 'items-center', 'gap-6')}
              >
                <div
                  className={cn(
                    'flex',
                    'px-[0.8125rem]',
                    'py-[0.8125rem]',
                    'items-center',
                    'rounded-full',
                    step.color,
                    'border',
                    'relative',
                    'z-10',
                    'bg-white',
                    'border-[3px]',
                  )}
                >
                  {step.icon}
                </div>
                <div className={cn('flex', 'flex-col', 'items-center', 'gap-2')}>
                  <p
                    className={cn(
                      'text-slate-800',
                      'font-semibold',
                      'mdx:text-[1.25rem]/[1.75rem]',
                      'text-[1rem]/[1.5rem]',
                    )}
                  >
                    {step.title}
                  </p>
                  <p
                    className={cn(
                      'text-gray-500',
                      'font-normal',
                      'mdx:text-[1rem]/[1.75rem]',
                      'text-[0.75rem]/[1.5rem]',
                    )}
                  >
                    {step.date}
                  </p>
                </div>
                {index < 3 && (
                  <div
                    className={cn(
                      'absolute',
                      'lg:top-[20%]',
                      'top-[17.5%]',
                      'left-[calc(10%+1rem)]',
                      'w-[100vw]',
                      'right-0',
                      'h-[2px]',
                      'bg-blue-200',
                      'z-0',
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className={cn('flex', 'justify-around', 'mt-[3.25rem]', 'hidden', 'smx:flex')}>
            {stepsData.slice(4).map((step, index) => (
              <div
                key={index}
                className={cn('flex', 'w-[18.9375rem]', 'flex-col', 'items-center', 'gap-6')}
              >
                <div
                  className={cn(
                    'flex',
                    'px-[0.8125rem]',
                    'py-[0.8125rem]',
                    'items-center',
                    'rounded-full',
                    step.color,
                    'border',
                    'relative',
                    'z-10',
                    'bg-white',
                    'border-[3px]',
                  )}
                >
                  {step.icon}
                </div>
                <div className={cn('flex', 'flex-col', 'items-center', 'gap-2')}>
                  <p
                    className={cn(
                      'text-slate-800',
                      'font-semibold',
                      'mdx:text-[1.25rem]/[1.75rem]',
                      'text-[1rem]/[1.5rem]',
                    )}
                  >
                    {step.title}
                  </p>
                  <p
                    className={cn(
                      'text-gray-500',
                      'font-normal',
                      'mdx:text-[1rem]/[1.75rem]',
                      'text-[0.75rem]/[1.5rem]',
                      'smx:text-center',
                      'text-left',
                    )}
                  >
                    {step.date}
                  </p>
                </div>
                {index < 1 && (
                  <div
                    className={cn(
                      'absolute',
                      'lg:bottom-[32.5%]',
                      'bottom-[33%]',
                      'right-[calc(22.5%+4rem)]',
                      'w-[100vw]',
                      'h-[2px]',
                      'bg-blue-200',
                      'z-0',
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className={cn('flex', 'smx:hidden', 'mt-[5.5rem]', 'gap-8')}>
            <div className={cn('flex', 'flex-col', 'items-center')}>
              {stepsData.map((step, index) => (
                <div key={index} className={cn('flex', 'flex-col', 'items-center')}>
                  <div
                    className={cn(
                      'flex',
                      'px-[0.8125rem]',
                      'py-[0.8125rem]',
                      'items-center',
                      'rounded-full',
                      step.color,
                      'border',
                      'relative',
                      'z-10',
                      'bg-white',
                      'border-[3px]',
                    )}
                  >
                    {step.icon}
                  </div>
                  {index < stepsData.length - 1 && (
                    <div className={cn('w-[2px]', 'h-[5rem]', 'bg-[#DBEAFE]')} />
                  )}
                </div>
              ))}
            </div>

            <div className={cn('flex', 'flex-col', 'gap-[4.785rem]')}>
              {stepsData.map((step, index) => (
                <div
                  key={index}
                  className={cn('flex', 'flex-col', 'justify-center', 'gap-2', 'h-[4.25rem]')}
                >
                  <p
                    className={cn(
                      'text-slate-800',
                      'sm:text-[1.5rem]/[2rem]',
                      'text-[1rem]/[1.75rem]',
                      'font-semibold',
                    )}
                  >
                    {step.title}
                  </p>
                  <p
                    className={cn(
                      'text-gray-500',
                      'sm:text-[1rem]/[1.75rem]',
                      'text-[0.75rem]/[1.5rem]',
                      'font-normal',
                      'smx:text-center',
                      'text-left',
                    )}
                  >
                    {step.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
