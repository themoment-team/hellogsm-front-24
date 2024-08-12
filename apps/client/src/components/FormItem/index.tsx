'use client';

import { PropsWithChildren } from 'react';

import { cn } from 'client/lib/utils';

interface FormItemProps extends PropsWithChildren {
  text: string;
  gap: 'small' | 'medium' | 'large';
  required?: boolean;
}

const gapClassNames = {
  small: 'gap-1',
  medium: 'gap-1.5',
  large: 'gap-2',
} as const;

const FormItem = ({ children, text, gap, required }: FormItemProps) => {
  const gapPx = gapClassNames[gap];

  return (
    <div className={cn('flex', 'flex-col', 'w-[380px]', gapPx)}>
      <span className={cn('text-gray-900', 'text-sm', 'font-medium')}>
        {text} {required && <span className="text-red-600">*</span>}
      </span>
      {children}
    </div>
  );
};

export default FormItem;
