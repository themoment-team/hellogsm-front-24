"use client";

import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "shared/components";
import { GoogleIcon, KakaoIcon } from "shared/assets";
import { cn } from "shared/lib/utils";

const loginButtonVariants = cva(cn("inline-flex"), {
  variants: {
    variant: {
      google: cn("bg-slate-800", "text-white", "hover:bg-slate-200"),
      kakao: cn("bg-blue-600", "text-white", "hover:bg-blue-800"),
    },
  },
  defaultVariants: {
    variant: "google",
  },
});

interface LoginButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof loginButtonVariants> {}

const LoginButton = React.forwardRef<HTMLButtonElement, LoginButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <Button ref={ref} className={cn(loginButtonVariants({ variant }))} {...props}>
        <GoogleIcon />
        <KakaoIcon />
        Google 계정으로 로그인
      </Button>
    );
  },
);
LoginButton.displayName = "LoginButton";

export { LoginButton };
