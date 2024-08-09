'use client';

import { cn } from 'client/lib/utils';

interface ProgressIndicatorProps {
  steps: number;
  activeStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps, activeStep }) => {
  return (
    <div className={cn('flex', 'justify-center', 'items-center', 'w-full', 'py-4')}>
      <div className={cn('items-center', 'justify-center', 'flex', 'w-[80.625rem]')}>
        {Array.from({ length: steps }).map((_, index) => (
          <div key={index} className={cn('flex', 'w-full', 'items-center')}>
            <div
              className={cn(
                'rounded-full',
                'transition-colors',
                index === activeStep ? 'bg-sky-700' : 'bg-gray-300',
                index === activeStep ? 'h-[1.375rem]' : 'h-[0.75rem]',
                index === activeStep ? 'w-[1.375rem]' : 'w-[0.75rem]',
                index === activeStep ? 'left-[6.875rem]' : 'left-[7.1875rem]',
                'relative',
                'flex',
                'items-center',
                'justify-center',
                'outline',
                'outline-8',
                'outline-white',
                'z-10',
                'relative',
              )}
            >
              <div
                className={cn(
                  'h-[0.75rem]',
                  'w-[0.75rem]',
                  'rounded-full',
                  index === activeStep ? 'bg-white' : 'bg-gray-300',
                )}
              />
            </div>
            <div
              className={cn(
                'h-0.5',
                'transition-colors',
                'bg-gray-300',
                'w-[79.875rem]',
                'absolute',
                'left-[7.1875rem]',
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
