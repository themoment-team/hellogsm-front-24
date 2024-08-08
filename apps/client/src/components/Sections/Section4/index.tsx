import { BlueDot, GreenDot } from 'client/assets';

import { cn } from 'shared/lib/utils';

const TITLES = [
  {
    firstText: 'AI 시대를 선도할',
    lastText: 'GSM 교육과정 운영',
    icon: '🎯',
  },
  {
    firstText: '직업군에 최적화된',
    lastText: '취업역량 강화',
    icon: '💪',
  },
  {
    firstText: '산업수요 변화에 맞춘',
    lastText: '현장실무능력 향상',
    icon: '💡',
  },
  {
    firstText: '자율성과 자기 주도성으로',
    lastText: '학습 능력 신장',
    icon: '🚀',
  },
] as const;

interface DotWithTextProps {
  Dot: React.FC;
  text: string;
  textColor: string;
}

const DotWithText: React.FC<DotWithTextProps> = ({ Dot, text, textColor }) => (
  <div className={cn('flex', 'flex-col', 'items-center')}>
    <Dot />
    <p className={cn(textColor, 'text-[2rem]/[2.75rem]', 'font-[600]')}>{text}</p>
  </div>
);

interface TitleCardProps {
  firstText: string;
  lastText: string;
  icon: string;
}

const TitleCard: React.FC<TitleCardProps> = ({ firstText, lastText, icon }) => (
  <div
    className={cn(
      'flex',
      'pt-[2rem]',
      'pb-[1.5rem]',
      'px-[1.5rem]',
      'flex-col',
      'justify-end',
      'items-end',
      'rounded-[1rem]',
      'shadow-lg',
      'gap-[1.8125rem]',
      'w-[19.4375rem]',
    )}
  >
    <div className={cn('flex', 'w-[16.4375rem]', 'flex-col', 'items-start')}>
      <p className={cn('text-sky-800', 'font-[600]', 'text-[1.5rem]/[2.25rem]')}>
        {firstText}
        <br />
        {lastText}
      </p>
    </div>
    <p className={cn('text-right', 'text-[4.25rem]/[5.95rem]', 'font-[600]')}>{icon}</p>
  </div>
);

const Section4: React.FC = () => {
  return (
    <section className={cn('gap-[4.25rem]', 'flex', 'items-center', 'flex-col', 'bg-[#F5F9FB]')}>
      <div className={cn('flex', 'flex-col', 'items-center')}>
        <div className={cn('flex', 'items-end')}>
          <DotWithText Dot={GreenDot} text="인성" textColor="text-[#84CC16]" />
          <p className={cn('text-[#0C4A6E]', 'text-[2rem]/[2.75rem]', 'font-[600]')}>과 &nbsp;</p>
          <DotWithText Dot={GreenDot} text="감성" textColor="text-[#84CC16]" />
          <p className={cn('text-[#0C4A6E]', 'text-[2rem]/[2.75rem]', 'font-[600]')}>으로 &nbsp;</p>
          <DotWithText Dot={BlueDot} text="감동" textColor="text-[#38BDF8]" />
          <p className={cn('text-[#0C4A6E]', 'text-[2rem]/[2.75rem]', 'font-[600]')}>을 만드는</p>
        </div>
        <p className={cn('text-[#0C4A6E]', 'text-[2rem]/[2.75rem]', 'font-[600]')}>
          광주소프트웨어마이스터고등학교
        </p>
      </div>
      <div className={cn('flex', 'items-center', 'gap-[0.75rem]')}>
        {TITLES.map(({ firstText, lastText, icon }) => (
          <TitleCard key={firstText} firstText={firstText} lastText={lastText} icon={icon} />
        ))}
      </div>
    </section>
  );
};

export default Section4;
