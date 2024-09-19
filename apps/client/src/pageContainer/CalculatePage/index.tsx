'use client';

import { useState } from 'react';

import Image from 'next/image';
import { Button, ScoreRegister, useStore } from 'shared';
import { GraduationType } from 'types';

import { ComputerRecommendedPage } from 'client/pageContainer';

import { cn } from 'shared/lib/utils';

const graduationArray: { text: string; value: GraduationType; img: string }[] = [
  { text: '졸업 예정', value: 'CANDIDATE', img: '/images/candidate.png' },
  { text: '졸업자', value: 'GRADUATE', img: '/images/graduate.png' },
  { text: '검정고시', value: 'GED', img: '/images/ged.png' },
];

const CalculatePage = () => {
  const { graduationType, setGraduationType } = useStore();
  const [isClickable, setIsClickable] = useState(false);

  return (
    <>
      <ComputerRecommendedPage />
      {graduationType ? (
        <div className={cn('sm:flex', 'justify-center', 'rounded-[1.25rem]', 'hidden')}>
          <div className={cn('pb-10', 'mb-40', 'bg-white', 'mt-[3.56rem]', 'rounded-[1.25rem]')}>
            <header
              className={cn(
                'w-266',
                'flex',
                'justify-end',
                'px-7',
                'h-[4.25rem]',
                'items-center',
                'rounded-t-[1.25rem]',
                'gap-2',
                'border-b-[0.0625rem]',
                'border-gray-100',
              )}
            >
              <Button onClick={() => setGraduationType(undefined)} variant="ghost">
                이전
              </Button>
              <Button
                form="scoreForm"
                type="submit"
                variant={isClickable ? 'next' : 'submit'}
                disabled={!isClickable}
              >
                내 성적 계산하기
              </Button>
            </header>
            <div className={cn('w-full', 'h-6')} />
            <ScoreRegister
              type="calculate"
              data={undefined}
              isStep4Clickable={isClickable}
              setIsStep4Clickable={setIsClickable}
            />
          </div>
        </div>
      ) : (
        <div className={cn('sm:flex', 'w-full', 'justify-center', 'mt-48', 'hidden')}>
          <div className={cn('flex', 'flex-col', 'items-center', 'gap-10')}>
            <h1 className={cn('text-[1.5rem]/[2rem]', 'text-gray-900', 'font-semibold')}>
              모의 성적 계산을 위한 지원자 유형을 선택해 주세요.
            </h1>
            <div className={cn('flex', 'gap-5', 'w-[39.4375rem]')}>
              {graduationArray.map(({ text, value, img }) => (
                <button
                  key={value}
                  className={cn(
                    'h-28',
                    'pt-5',
                    'pl-5',
                    'w-[12.3125rem]',
                    'bg-white',
                    'rounded-xl',
                    'flex',
                    'flex-col',
                    'justify-between',
                  )}
                  onClick={() => setGraduationType(value)}
                >
                  <h1
                    className={cn(
                      'text-[1rem]/[1.5rem]',
                      'text-gray-800',
                      'font-semibold',
                      'text-start',
                    )}
                  >
                    {text}
                  </h1>
                  <Image
                    src={img}
                    width={56}
                    height={56}
                    alt={text}
                    className={cn(['ml-[5.81rem]'])}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalculatePage;
