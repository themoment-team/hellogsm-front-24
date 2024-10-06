'use client';

import Image from 'next/image';

import { cn } from 'shared/lib/utils';

import { Members } from './about';

type Role = 'Back-end' | 'Front-end' | 'UI/UX Design' | 'DevOps';

const roleColors: Record<Role, string> = {
  'Back-end': 'text-orange-500',
  'Front-end': 'text-sky-600',
  'UI/UX Design': 'text-pink-600',
  DevOps: 'text-teal-500',
};

const TeamSection4 = () => {
  const itemWidth = 18.4375;
  const itemSpacing = 1;

  const totalItemWidth = Members.length * itemWidth;
  const totalSpacingWidth = (Members.length - 1) * itemSpacing;
  const totalWidth = totalItemWidth + totalSpacingWidth;

  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'overflow-hidden',
        'w-full',
        'bg-white',
        'py-[15rem]',
        'items-center',
        'gap-[6.25rem]',
      )}
    >
      <h3 className={cn('text-[#0F0921]', 'text-[2.75rem]/[3.85rem]', 'font-bold')}>
        &quot;입학지원시스템, <br className={cn('block', 'sm:hidden')} />
        누가 만들었을까요?&quot;
      </h3>
      <div className={cn('flex', 'flex-col', 'relative', 'w-full', 'overflow-hidden', 'gap-6')}>
        <div
          className={cn('flex', 'space-x-4', 'whitespace-nowrap')}
          style={{
            width: `${totalWidth * 2}rem`,
            animation: 'scrollRight 25s linear infinite',
          }}
        >
          {Members.concat(Members).map((member, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(member.githubURL)}
              className={cn(
                'flex',
                'items-center',
                'w-[18.4375rem]',
                'h-[7rem]',
                'rounded-xl',
                'border',
                'border-[#B2B2B2]',
                'bg-white',
                'p-5',
                'gap-1',
                'space-x-4',
                'flex-shrink-0',
                'cursor-pointer',
              )}
            >
              <Image
                src={member.imageURL}
                width={72}
                height={72}
                alt={member.name}
                className={cn('rounded-full')}
              />
              <div>
                <p className={cn('text-[1.5rem]/[2rem]', 'font-medium')}>{member.name}</p>
                <p
                  className={cn(
                    'text-[1.375rem]/[1.75rem]',
                    'font-normal',
                    roleColors[member.role as Role],
                  )}
                >
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          className={cn('flex', 'space-x-4', 'whitespace-nowrap')}
          style={{
            width: `${totalWidth * 2}rem`,
            animation: 'scrollLeft 25s linear infinite',
          }}
        >
          {Members.concat(Members)
            .reverse()
            .map((member, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(member.githubURL)}
                className={cn(
                  'flex',
                  'items-center',
                  'w-[18.4375rem]',
                  'h-[7rem]',
                  'rounded-xl',
                  'border',
                  'border-[#B2B2B2]',
                  'bg-white',
                  'p-5',
                  'gap-1',
                  'space-x-4',
                  'flex-shrink-0',
                  'cursor-pointer',
                )}
              >
                <Image
                  src={member.imageURL}
                  width={72}
                  height={72}
                  alt={member.name}
                  className={cn('rounded-full')}
                />
                <div>
                  <p className={cn('text-[1.5rem]/[2rem]', 'font-medium')}>{member.name}</p>
                  <p
                    className={cn(
                      'text-[1.375rem]/[1.75rem]',
                      'font-normal',
                      roleColors[member.role as Role],
                    )}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes scrollRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${totalWidth + 1}rem);
          }
        }
        @keyframes scrollLeft {
          0% {
            transform: translateX(-${totalWidth + 1}rem);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TeamSection4;
