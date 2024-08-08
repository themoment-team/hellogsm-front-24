'use client';

import { useEffect, useState } from 'react';

import { cn } from 'client/lib/utils';

const ProgressIndicator = ({ steps, activeStep }) => {
  return (
    <div className={cn('flex', 'justify-center', 'items-center', 'w-full', 'py-4')}>
      <div className={cn('items-center', 'justify-center', 'flex', 'w-full', 'max-w-4xl')}>
        {Array.from({ length: steps }).map((_, index) => (
          <div key={index} className={cn('flex', 'w-[1000px]', 'items-center')}>
            <div
              className={cn(
                'rounded-full',
                'transition-colors',
                index === activeStep ? 'bg-sky-700' : 'bg-gray-300',
                index === activeStep ? 'h-[22px]' : 'h-[12px]',
                index === activeStep ? 'w-[22px]' : 'w-[12px]',
                'flex',
                'items-center',
                'justify-center',
                'outline',
                'outline-8',
                'outline-white',
                'z-10',
              )}
            >
              <div
                className={cn(
                  'h-[12px]',
                  'w-[12px]',
                  'rounded-full',
                  index === activeStep ? 'bg-white' : 'bg-gray-300',
                )}
              />
            </div>
            <div
              className={cn(
                'h-0.5',
                'transition-colors',
                'bg-gray-300',
                'w-[1278px]',
                'absolute',
                'left-[110px]',
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Section2 = () => {
  const steps = 5;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps);
    }, 2000);

    return () => clearInterval(interval);
  }, [steps]);

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'w-full',
        'bg-white',
        'relative',
        'h-[50.375rem]',
        'px-6',
        'py-6',
      )}
    >
      <div className={cn('mb-8', 'text-center')}>
        <h1 className={cn('text-2xl', 'font-bold')}>광주소프트웨어마이스터고등학교</h1>
        <h2 className={cn('text-xl', 'font-medium')}>2025 신입생 모집절차</h2>
        <p className={cn('mt-4', 'text-gray-600')}>
          우리 학교에 입학하기 위해 필요한 다섯 가지 절차를 소개해드릴게요!
        </p>
      </div>

      <ProgressIndicator steps={steps} activeStep={activeStep} />

      <div
        className={cn(
          'flex w-full',
          'max-w-7xl',
          'items-center',
          'justify-between',
          'mt-8',
          'gap-[12px]',
        )}
      >
        <div
          className={cn(
            'border',
            'rounded-lg',
            'shadow-sm',
            activeStep === 0 ? 'border-sky-700' : 'border-gray-400',
            'w-[246px]',
            'h-[116px]',
            'flex',
            'flex-col',
            'py-[20px]',
            'px-[16px]',
          )}
        >
          {/* <div className={cn('mb-2')}>📝</div> */}
          <p className={cn('font-semibold', activeStep === 0 ? 'text-sky-700' : 'text-gray-400')}>
            원서접수 및 증빙서류 제출
          </p>
          <p className={cn('text-sm', activeStep === 0 ? 'text-sky-700' : 'text-gray-400')}>
            2024.10.14. (월) ~ 17(목)
          </p>
        </div>

        <div
          className={cn(
            'border',
            'rounded-lg',
            'shadow-sm',
            'w-[246px]',
            'h-[116px]',
            'flex',
            'flex-col',
            'py-[20px]',
            'px-[16px]',
            activeStep === 1 ? 'border-sky-700' : 'border-gray-400',
          )}
        >
          {/* <div className={cn('mb-2')}>🏆</div> */}
          <p className={cn('font-semibold', activeStep === 1 ? 'text-sky-700' : 'text-gray-400')}>
            1차 결과발표
          </p>
          <p className={cn('text-sm', activeStep === 1 ? 'text-sky-700' : 'text-gray-400')}>
            2024.10.25(금) 14:30~16:30
          </p>
        </div>

        <div
          className={cn(
            'border',
            'rounded-lg',
            'shadow-sm',
            activeStep === 2 ? 'border-sky-700' : 'border-gray-400',
            'w-[246px]',
            'h-[116px]',
            'flex',
            'flex-col',
            'py-[20px]',
            'px-[16px]',
          )}
        >
          {/* <div className={cn('mb-2')}>✏️</div> */}
          <p className={cn('font-semibold', activeStep === 2 ? 'text-sky-700' : 'text-gray-400')}>
            직무적성소양평가
          </p>
          <p className={cn('text-sm', activeStep === 2 ? 'text-sky-700' : 'text-gray-400')}>
            2024.10.25(금) 14:30~16:30
          </p>
        </div>

        <div
          className={cn(
            'border',
            'rounded-lg',
            'shadow-sm',
            activeStep === 3 ? 'border-sky-700' : 'border-gray-400',
            'w-[246px]',
            'h-[116px]',
            'flex',
            'flex-col',
            'py-[20px]',
            'px-[16px]',
          )}
        >
          {/* <div className={cn('mb-2')}>💬</div> */}
          <p className={cn('font-semibold', activeStep === 3 ? 'text-sky-700' : 'text-gray-400')}>
            심층면접
          </p>
          <p className={cn('text-sm', activeStep === 3 ? 'text-sky-700' : 'text-gray-400')}>
            2024.10.25(금) 14:30~16:30
          </p>
        </div>

        <div
          className={cn(
            'border',
            'rounded-lg',
            'shadow-sm',
            activeStep === 4 ? 'border-sky-700' : 'border-gray-400',
            'w-[246px]',
            'h-[116px]',
            'flex',
            'flex-col',
            'py-[20px]',
            'px-[16px]',
          )}
        >
          {/* <div className={cn('mb-2')}>🏁</div> */}
          <p className={cn('font-semibold', activeStep === 4 ? 'text-sky-700' : 'text-gray-400')}>
            최종 결과발표
          </p>
          <p className={cn('text-sm', activeStep === 4 ? 'text-sky-700' : 'text-gray-400')}>
            2024.10.25(금) 14:30~16:30
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section2;
