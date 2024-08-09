'use client';

import { useEffect, useState } from 'react';

import { cn } from 'client/lib/utils';

import ProgressIndicator from './ProgressIndicator';

const stepsData = [
  { icon: '📃', title: '원서 접수 및 증빙서류 제출', date: '2024.10.14. (월) ~ 17(목)' },
  { icon: '🏆', title: '1차 결과발표', date: '2024.10.25(금) 14:30~16:30' },
  { icon: '✏️', title: '직무적성소양평가', date: '2024.10.25(금) 14:30~16:30' },
  { icon: '💬', title: '심층면접', date: '2024.10.25(금) 14:30~16:30' },
  { icon: '⛳', title: '최종 결과발표', date: '2024.10.25(금) 14:30~16:30' },
];

const Section2 = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % stepsData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn('w-full', 'bg-white', 'relative', 'h-[50.375rem]', 'py-[11.25rem]')}>
      <div className={cn('flex', 'flex-col', 'justify-between', 'items-center', 'h-[27.875rem]')}>
        <div className={cn('flex', 'justify-between', 'items-center', 'w-[80rem]')}>
          <h1 className={cn('text-2xl', 'font-bold')}>
            광주소프트웨어마이스터고등학교
            <br />
            2025 신입생 모집절차
          </h1>
          <p className={cn('mt-4', 'text-gray-600', 'font-normal')}>
            우리 학교에 입학하기 위해 필요한
            <br />
            다섯 가지 절차를 소개해드릴게요!
          </p>
        </div>
        <div>
          <div className={cn('flex', 'gap-[0.625rem]', 'text-h4')}>
            {stepsData.map((step, index) => (
              <div
                key={index}
                className={cn(
                  'flex',
                  'flex-col',
                  'justify-center',
                  'items-center',
                  'w-[15.375rem]',
                )}
              >
                <div className={cn('mb-2')}>{step.icon}</div>
                <p
                  className={cn(
                    'text-h4',
                    'font-semibold',
                    activeStep === index ? 'text-sky-700' : 'text-gray-400',
                  )}
                >
                  {step.title}
                </p>
              </div>
            ))}
          </div>
          <ProgressIndicator steps={stepsData.length} activeStep={activeStep} />

          <div
            className={cn(
              'flex w-full',
              'max-w-7xl',
              'items-center',
              'justify-between',
              'mt-8',
              'gap-[0.75rem]',
            )}
          >
            {stepsData.map((step, index) => (
              <div
                key={index}
                className={cn(
                  'border',
                  'rounded-lg',
                  'shadow-sm',
                  'w-[15.375rem]',
                  'h-[7.25rem]',
                  'flex',
                  'flex-col',
                  'py-[1.25rem]',
                  'px-[1rem]',
                  activeStep === index ? 'border-sky-700' : 'border-gray-400',
                )}
              >
                <p
                  className={cn(
                    'text-h4',
                    'font-semibold',
                    activeStep === index ? 'text-sky-700' : 'text-gray-400',
                  )}
                >
                  {step.title}
                </p>
                <p
                  className={cn('text-sm', activeStep === index ? 'text-sky-700' : 'text-gray-400')}
                >
                  {step.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
