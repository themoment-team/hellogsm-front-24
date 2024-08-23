'use client';

import { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ChannelTalk, Footer, Header } from 'client/components';
import { cn } from 'client/lib/utils';

const Provider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={cn('min-h-screen', 'flex', 'flex-col', 'justify-between')}>
        <Header />
        {children}
        <ChannelTalk />
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default Provider;
