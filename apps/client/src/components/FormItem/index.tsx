'use client';

import { PropsWithChildren } from 'react';

import { cn } from 'client/lib/utils';

interface FormItemProps extends PropsWithChildren {
  text: string;
  required?: boolean;
  className?: string;
}

const FormItem = ({ children, text, className, required }: FormItemProps) => {
  return (
    <div className={cn(className, 'flex', 'flex-col', 'w-[23.75rem]')}>
      <span className={cn('text-gray-900', 'text-sm', 'font-medium')}>
        {text} {required && <span className="text-red-600">*</span>}
      </span>
      {children}
    </div>
  );
};

export default FormItem;