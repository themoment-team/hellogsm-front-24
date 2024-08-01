"use client";

import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "shared/components";
import { GoogleIcon, KakaoIcon } from "shared/assets";
import { cn } from "shared/lib/utils";

const loginButtonVariants = cva(
  cn(
    "text-gray-700",
    "gap-4",
    "py-4",
    "h-auto",
    "text-lg",
    "border",
    "rounded-lg",
    "font-semibold",
    "pl-7",
    "pr-8",
  ),
  {
    variants: {
      variant: {
        google: cn("bg-white", "hover:bg-white", "border-gray-200"),
        kakao: cn("bg-[#FEE404]", "hover:bg-[#FEE404]"),
      },
    },
    defaultVariants: {
      variant: "google",
    },
  },
);

interface LoginButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof loginButtonVariants> {}

const LoginButton = React.forwardRef<HTMLButtonElement, LoginButtonProps>(
  ({ className, variant, ...props }, ref) => {
    const OAuthValues = {
      google: {
        icon: <GoogleIcon />,
        text: "Google",
      },
      kakao: {
        icon: <KakaoIcon />,
        text: "Kakao",
      },
    };

    return (
      <Button ref={ref} className={cn(loginButtonVariants({ variant }), className)} {...props}>
        {variant && OAuthValues[variant].icon}
        {variant && OAuthValues[variant].text} 계정으로 로그인
      </Button>
    );
  },
);
LoginButton.displayName = "LoginButton";

export { LoginButton };
