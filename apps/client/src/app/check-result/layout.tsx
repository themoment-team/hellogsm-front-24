'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

import { Footer } from 'client/components';

import { cn } from 'shared/lib/utils';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      <div
        className={cn(
          'h-[calc(100vh-4.625rem)]',
          'flex',
          'justify-center',
          segment ? 'bg-white' : 'bg-gray-100',
        )}
      >
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
