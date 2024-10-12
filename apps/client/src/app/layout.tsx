import { GoogleAnalytics } from 'client/lib';

import Provider from './provider';

import type { Metadata } from 'next';

import 'shared/styles/globals.css';

export const metadata: Metadata = {
  title: '광주소프트웨어마이스터고등학교 입학 지원 서비스',
  description: '광주소프트웨어마이스터고등학교 입학 지원 서비스 홈페이지입니다.',
  applicationName: 'Hello, GSM',
  keywords: [
    '광주소프트웨어마이스터고등학교',
    '광주소프트웨어마이스터고',
    '광소마',
    '광주',
    '소프트웨어',
    '마이스터고',
    '마이스터고등학교',
    'GSM',
    'GwangjuSoftwareMeisterHighSchool',
    'SoftWare',
    'Gwangju',
    'MeisterHighSchool',
  ],
  creator: 'the-moment',
  publisher: 'the-moment',
  icons: {
    icon: '/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO 로컬 font 적용시키기

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
      {process.env.NEXT_PUBLIC_STAGE === 'stage' && (
        <>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="msvalidate.01" content="14471419A8701E4145F89E3ADCCFB1D6" />
        </>
      )}
      <body>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        )}
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
