'use client';

import { useEffect, useState } from 'react';

import { UseFormWatch } from 'react-hook-form';
import { basicRegisterType } from 'types';

import { cn } from 'shared/lib/utils';

type FormField = keyof basicRegisterType;

interface RadioButtonProps {
  title: string;
  options: string[];
  required?: boolean;
  disabled?: boolean;
  disabledOption?: string;
  onChange?: (value: string) => void;
  watch?: UseFormWatch<basicRegisterType>;
  watchContent?: FormField;
  defaultValue?: string;
}

const RadioButton = ({
  title,
  options,
  required,
  disabled,
  disabledOption,
  onChange,
  watch,
  watchContent,
  defaultValue,
}: RadioButtonProps) => {
  const [selectedOption, setSelectedOption] = useState<string>(defaultValue ? defaultValue : '');

  useEffect(() => {
    if (watch && watchContent) {
      const watchValue = watch(watchContent);

      if (typeof watchValue === 'string' && options.includes(watchValue)) {
        setSelectedOption(watchValue);
      } else if (
        Array.isArray(watchValue) &&
        watchValue.length > 0 &&
        options.includes(watchValue[0])
      ) {
        setSelectedOption(watchValue[0]);
      } else {
        setSelectedOption('');
      }
    }
  }, [watch, watchContent, options]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (onChange) {
      onChange(value);
    }
  };

  const textStyle = ['text-slate-900', 'text-body2', 'font-medium'];
  return (
    <div className={cn('w-full', 'flex', 'flex-col', 'items-start', 'gap-[0.75rem]')}>
      <div className={cn(...textStyle)}>
        {title} {required && <span className="text-red-600">*</span>}
      </div>
      <div className={cn('flex', 'items-start', 'gap-[1.25rem]')}>
        {options.map((option, index) => (
          <div key={index} className={cn('flex', 'items-center', 'gap-[0.5rem]')}>
            <input
              type="radio"
              name={title}
              value={option}
              checked={selectedOption === option}
              disabled={disabled || option === disabledOption}
              onChange={handleChange}
              className={cn(
                'appearance-none',
                'cursor-pointer',
                'w-4',
                'h-4',
                'border-[1px]',
                'border-slate-200',
                'rounded-full',
                'relative',
                'after:content-[""]',
                'after:absolute',
                'after:top-1/2',
                'after:left-1/2',
                'after:w-2',
                'after:h-2',
                'after:rounded-full',
                'after:transform',
                'after:-translate-x-1/2',
                'after:-translate-y-1/2',
                'checked:after:scale-100',
                'after:scale-0',
                'transition-transform',
                disabled ? 'after:bg-slate-400' : 'after:bg-black',
              )}
            />
            <p className={cn(...textStyle)}>{option}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioButton;
