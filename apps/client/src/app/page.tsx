import { Footer, Header, Section3 } from 'client/components';
import { cn } from 'client/lib/utils';

export default function Home() {
  return (
    <div className={cn('min-h-screen', 'flex', 'flex-col', 'justify-between')}>
      <Header isLogin={true} name="사용자" />
      <Section3 />
      <Footer />
    </div>
  );
}
