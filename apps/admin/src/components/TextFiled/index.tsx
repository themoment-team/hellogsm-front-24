import * as React from 'react';

import { Input } from 'shared/components';
import { cn } from 'shared/lib/utils';

const TextFiled = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return <Input className={cn('w-[84px]', className)} />;
  },
);
TextFiled.displayName = 'TextFiled';

export { TextFiled };
