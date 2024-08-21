'use client';

import { cn } from 'shared/lib/utils';

import Video from './Video';

const Section1 = () => (
  <div
    className={cn(
      'w-full',
      'h-dvh',
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
        'h-dvh',
        'bg-[rgba(0, 0, 0, 0.40)]',
        'absolute',
        'top-0',
        'z-[2]',
        'flex',
        'items-center',
        'justify-center',
        'opacity-80',
      )}
    >
      <h1
        className={cn('w-[49.0625rem]', 'text-center', 'text-[3.25rem]', 'font-bold', 'text-white')}
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
    </div>
  </div>
);

export default Section1;
