import Provider from './provider';

import type { Metadata } from 'next';

import 'shared/styles/globals.css';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
