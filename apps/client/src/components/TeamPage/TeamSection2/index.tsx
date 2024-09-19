import { TheMomentIcon } from 'client/assets';

import { cn } from 'shared/lib/utils';

const TeamSection2 = () => {
  return (
    <div
      className={cn(
        'flex',
        'justify-between',
        'items-center',
        'w-full',
        'bg-white',
        'py-[15rem]',
        'px-0',
        'sm:px-[3.75rem]',
        'md:px-[8rem]',
        'xl:px-[12.5rem]',
        'fhd:px-[20rem]',
        'uhd:px-[22.5rem]',
      )}
    >
      <div className={cn('flex', 'w-[43.75rem]', 'flex-col', 'gap-6')}>
        <h1 className={cn('text-[#473B6B]', 'text-[4.25rem]/[5.525rem]', 'font-bold')}>
          <span className={cn('text-[#7C58E9]')}>더모먼트</span>는
          <br />
          어떤 팀 인가요?
        </h1>
        <span className={cn('text-[#5D5B64]', 'text-[1.25rem]/[2rem]', 'font-normal')}>
          더모먼트팀은 광주소프트웨어마이스터고등학교의 전공 동아리입니다. <br />
          약 30명의 재학생, 졸업생들이 모여서 활동하고, 주로 학교에 필요한 서비스를 개발합니다.
          <br />
          학교에 필요한 서비스를 함께 개발하고 싶나요? <br />
          지금 바로 SW 마이스터고에 지원하세요 !
        </span>
      </div>
      <div
        className={cn(
          'flex',
          'justify-center',
          'items-center',
          'w-[17.875rem]',
          'h-[17.875rem]',
          'shadow-[0px_8.171px_44.5px_rgba(59,48,126,0.10)]',
          'rounded-[3rem]',
          'relative',
        )}
      >
        <div
          className={cn(
            'absolute',
            'inset-0',
            'rounded-[3rem]',
            'shadow-[10px_-10px_20px_#C8B6FF, -10px_10px_20px_#B6C2FF]', // 그림자 추가
          )}
        />
        <TheMomentIcon />
      </div>
    </div>
  );
};

export default TeamSection2;
