'use client';

import Link from 'next/link';

import { cn } from 'shared/lib/utils';

const firstResultUrl = '/check-result/first';

const finalResultUrl = '/check-result/final';

const linkStyle = [
  'text-gray-900',
  'text-[1rem]/[1.5rem]',
  'font-semibold',
  'w-[12.3125rem]',
  'h-[6.5rem]',
  'bg-white',
  'rounded-xl',
  'p-5',
  'flex',
  'relative',
  'shadow-md',
] as const;

const imgStyle = ['absolute', 'top-[2.75rem]', 'right-[1.12rem]'] as const;

const containerStyle = ['flex', 'flex-col', 'gap-10', 'items-center'] as const;

const h1Style = ['text-gray-900', 'text-[1.5rem]/[2rem]', 'font-semibold'] as const;

const CheckResultPage = () => {
  return (
    <>
      <div className={cn([containerStyle, 'mt-48'])}>
        <h1 className={cn([h1Style])}>합격 유형을 선택해주세요.</h1>
        <div className={cn('flex', 'gap-5')}>
          <Link href={firstResultUrl} className={cn([linkStyle])}>
            1차 합격 조회
            <img src="/images/🍀.png" className={cn([imgStyle, 'w-[3.75rem]', 'h-[3.75rem]'])} />
          </Link>
          <Link href={finalResultUrl} className={cn([linkStyle])}>
            최종 합격 조회
            <img src="/images/🏆.png" className={cn([imgStyle, 'w-[3.75rem]', 'h-[3.125rem]'])} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default CheckResultPage;
