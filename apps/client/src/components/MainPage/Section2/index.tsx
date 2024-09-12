'use client';

import { useState, useEffect } from 'react';

import { cn } from 'client/lib/utils';

const stepsData = [
  { icon: '📃', title: '원서 접수 및 증빙서류 제출', date: '2024.10.14(월) ~ 17(목) 09:00-17:00' },
  { icon: '🏆', title: '1차 결과발표', date: '2024.10.21(월) 10:00' },
  { icon: '✏️', title: '직무적성소양평가', date: '2024.10.25(금) 14:30~16:30' },
  { icon: '💬', title: '심층면접', date: '2024.10.26(토) 09:00~17:00' },
  { icon: '⛳', title: '최종 결과발표', date: '2024.10.30(수) 10:00' },
] as const;

const Section2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % stepsData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="section2" className={cn('w-full', 'bg-white', 'relative', 'py-[11.25rem]')}>
      <div
        className={cn(
          'flex',
          'flex-col',
          'justify-between',
          'items-center',
          'gap-[1.5rem]',
          'smx:gap-[7.5rem]',
        )}
      >
        <div
          className={cn(
            'flex',
            'flex-col',
            'smx:flex-row',
            'justify-between',
            'items-center',
            'w-full',
            'gap-8',
            'smx:gap-0',
            'px-0',
            'sm:px-[3.75rem]',
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
              'hidden',
              'smx:inline',
              'text-[1rem]/[1.5rem]',
            )}
          >
            우리 학교에 입학하기 위해 필요한
            <br />
            다섯 가지 절차를 소개해드릴게요!
          </p>
          <div
            className={cn(
              'flex',
              'smx:hidden',
              'items-center',
              'px-2',
              'py-1',
              'gap-1',
              'rounded-md',
              'bg-slate-100',
            )}
          >
            {stepsData.map((_, index) => (
              <button
                key={index}
                className={cn(
                  'flex',
                  'px-4',
                  'sm:px-5',
                  'py-[0.375rem]',
                  'flex-col',
                  'items-center',
                  'justify-center',
                  'gap-2',
                  'rounded-md',
                  index === clickedIndex ? 'bold text-slate-600' : 'text-slate-400',
                  index === clickedIndex ? 'bg-white' : '',
                  'text-[1rem]/[1.5rem]',
                  'font-normal',
                )}
                onClick={() => setClickedIndex(index)}
              >
                {`${index + 1}차`}
              </button>
            ))}
          </div>
        </div>
        <div className={cn('hidden', 'smx:flex', 'items-center', 'justify-center', 'flex-wrap')}>
          {stepsData.map((step, index) => (
            <div key={index} className={cn('flex', 'gap-5', 'items-center', 'flex-col', 'pb-10')}>
              <div className={cn('flex', 'flex-col', 'items-center', 'gap-3')}>
                <p className={cn('text-gray-600', 'text-[1.875rem]/[2.25rem]', 'font-semibold')}>
                  {step.icon}
                </p>
                <p
                  className={cn(
                    index === activeIndex ? 'text-sky-900' : 'text-gray-400',
                    'text-[1.25rem]/[1.75rem]',
                    'font-semibold',
                  )}
                >
                  {step.title}
                </p>
              </div>

              {index < stepsData.length && (
                <div className={cn('flex', 'items-center', 'gap-2')}>
                  <div className={cn('w-[7.5rem]', 'h-px', 'bg-gray-300')}></div>{' '}
                  <div
                    className={cn(
                      'w-3',
                      'h-3',
                      'rounded-full',
                      index === activeIndex
                        ? 'border-2 border-white bg-white shadow-[0_0_0_4px_rgba(0,116,217,1)]'
                        : 'bg-gray-300',
                    )}
                  ></div>
                  <div className={cn('w-[7.5rem]', 'h-px', 'bg-gray-300')}></div>{' '}
                </div>
              )}

              <div
                className={cn(
                  'flex',
                  'flex-col',
                  'w-[16rem]',
                  'pt-[1.25rem]',
                  'pb-[2.75rem]',
                  'pr-[1.25rem]',
                  'pl-[0.75rem]',
                  'border',
                  'rounded-[0.75rem]',
                  index === activeIndex ? 'border-sky-900' : 'border-gray-400',
                  index === activeIndex ? 'text-sky-900' : 'text-gray-400',
                  'text-[1.25rem]/[1.75rem]',
                  'font-semibold',
                )}
              >
                {step.title}
                <p className={cn('text-[0.875rem]/[1.5rem]', 'font-normal')}>{step.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={cn(
            'flex',
            'smx:hidden',
            'py-[2rem]',
            'flex-col',
            'items-center',
            'gap-[1.125rem]',
            'rounded-xl',
            'bg-slate-50',
            'mx-4',
          )}
        >
          <div className={cn('flex', 'flex-col', 'gap-1', 'items-center')}>
            <div
              className={cn(
                'flex',
                'flex-col',
                'items-center',
                'gap-3',
                'text-sky-800',
                'text-[1.25rem]/[1.25rem]',
                'xs:text-[1.5rem]/[2rem]',
                'font-semibold',
              )}
            >
              <p className={cn('text-[1.875rem]/[2.25rem]')}>{stepsData[clickedIndex].icon}</p>
              {stepsData[clickedIndex].title}
            </div>
            <p className={cn('text-sky-900', 'text-[0.875rem]/[1.5rem]', 'font-normal')}>
              {stepsData[clickedIndex].date}
            </p>
          </div>

          <p
            className={cn(
              'max-w-[30rem]',
              'px-4',
              'text-slate-600',
              'text-[1rem]/[1.5rem]',
              'font-normal',
            )}
          >
            직무적성소양평가는 학생들의 역량을 직무적성소양평가는 학생들의 역량을직무적성소양평가는
            학생들의 역량을직무적성소양평가는 학생들의 역량을직무적성소양평가는 학생들의
            역량을직무적성소양평가는 학생들의 역량을직무적성
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section2;
