'use client';

import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { GoogleIcon, KakaoIcon } from 'shared/assets';
import { Button } from 'shared/components';
import { cn } from 'shared/lib/utils';

import { authUrl } from 'api/libs';

const loginButtonVariants = cva(
  cn(
    'text-gray-700',
    'gap-4',
    'py-4',
    'h-auto',
    'text-lg',
    'border',
    'rounded-lg',
    'font-semibold',
    'pl-7',
    'pr-8',
  ),
  {
    variants: {
      variant: {
        google: cn('bg-white', 'hover:bg-white', 'border-gray-200'),
        kakao: cn('bg-[#FEE404]', 'hover:bg-[#FEE404]'),
      },
    },
    defaultVariants: {
      variant: 'google',
    },
  },
);

interface LoginButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof loginButtonVariants> {}

const LoginButton = React.forwardRef<HTMLButtonElement, LoginButtonProps>(
  ({ className, variant, children, ...props }, ref) => {
    const OAuthValues = {
      google: {
        icon: <GoogleIcon />,
        href: authUrl.getLogin('google'),
      },
      kakao: {
        icon: <KakaoIcon />,
        href: authUrl.getLogin('kakao'),
      },
    };

    return (
      <>
        {variant && (
          <a href={`${process.env.NEXT_PUBLIC_API_BASE_URL}${OAuthValues[variant].href}`}>
            <Button
              ref={ref}
              className={cn(loginButtonVariants({ variant }), className)}
              {...props}
            >
              {OAuthValues[variant].icon}
              {children}
            </Button>
          </a>
        )}
      </>
    );
  },
);
LoginButton.displayName = 'LoginButton';

export { LoginButton };
