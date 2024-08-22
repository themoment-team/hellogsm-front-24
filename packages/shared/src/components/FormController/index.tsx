'use client';

import { useState } from 'react';

import { cn } from 'shared/lib/utils';

const formArray = ['일반교과', '예체능 교과', '비교과'] as const;

type FormType = '일반교과' | '예체능 교과' | '비교과';

interface FormControllerProps {
  className?: string;
}

const FormController = ({ className }: FormControllerProps) => {
  const [isSelected, setIsSelected] = useState<FormType | null>(null);

  const handleButtonClick = (formName: FormType) => {
    setIsSelected(formName);
    window.scrollTo({
      top: formName === '일반교과' ? 300 : 700,
      behavior: 'smooth',
    });
  };

  return (
    <div className={cn(['flex', 'flex-col', className])}>
      <div className={cn(['flex', 'flex-col', 'gap-[0.125rem]', 'sticky', 'top-[7rem]', 'h-fit'])}>
        {formArray.map((formName) => (
          <button
            onClick={() => handleButtonClick(formName)}
            className={cn([
              'flex',
              'w-[7.5rem]',
              'text-sm',
              'leading-5',
              'gap-[0.5rem]',
              'rounded-[0.375rem]',
              'px-[0.75rem]',
              'py-[0.5rem]',
              'items-center',
              isSelected === formName
                ? ['font-medium', 'bg-blue-50', 'text-blue-600']
                : ['font-normal', 'bg-transparent', 'text-slate-400'],
            ])}
            key={formName}
          >
            <div
              className={cn([
                'w-[0.5rem]',
                'h-[0.5rem]',
                'rounded-full',
                isSelected === formName ? 'bg-blue-500' : 'bg-slate-200',
              ])}
            ></div>
            {formName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormController;
