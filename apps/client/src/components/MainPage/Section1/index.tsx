'use client';

import { cn } from 'shared/lib/utils';

import Video from './Video';

const Section1 = () => (
  <div
    className={cn('w-full', 'h-dvh', 'fixed', 'top-0', 'z-0', 'flex', 'justify-center', 'bg-black')}
  >
    <Video />
    <div className={cn('w-full', 'h-dvh', 'bg-[rbga(0,0,0,0.5)]', 'absolute', 'top-0', 'z-[2]')} />
  </div>
);

export default Section1;
