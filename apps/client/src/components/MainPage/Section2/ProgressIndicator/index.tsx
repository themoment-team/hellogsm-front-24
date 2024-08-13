import { cn } from 'client/lib/utils';

interface ProgressIndicatorProps {
  steps: number;
  activeStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps, activeStep }) => {
  const stepStyle = [
    'rounded-full',
    'transition-colors',
    'relative',
    'flex',
    'items-center',
    'justify-center',
    'outline',
    'outline-8',
    'outline-white',
    'z-10',
  ];

  const activeStepStyle = ['bg-sky-700', 'h-[1.375rem]', 'w-[1.375rem]', 'left-[6.875rem]'];

  const inactiveStepStyle = ['bg-gray-300', 'h-[0.75rem]', 'w-[0.75rem]', 'left-[7.1875rem]'];

  const innerCircleStyle = ['h-[0.75rem]', 'w-[0.75rem]', 'rounded-full'];

  const activeInnerCircleStyle = ['bg-white'];
  const inactiveInnerCircleStyle = ['bg-gray-300'];

  return (
    <div className={cn('flex', 'justify-center', 'items-center', 'w-full', 'py-4')}>
      <div className={cn('items-center', 'justify-center', 'flex', 'w-[80.625rem]')}>
        {Array.from({ length: steps }).map((_, index) => (
          <div key={index} className={cn('flex', 'w-full', 'items-center')}>
            <div
              className={cn(
                ...stepStyle,
                ...(index === activeStep ? activeStepStyle : inactiveStepStyle),
              )}
            >
              <div
                className={cn(
                  ...innerCircleStyle,
                  ...(index === activeStep ? activeInnerCircleStyle : inactiveInnerCircleStyle),
                )}
              />
            </div>
            {index < steps - 1 && (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
