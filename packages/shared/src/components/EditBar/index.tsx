import { EditCheckIcon } from 'shared/assets';
import { cn } from 'shared/lib/utils';

interface EditBarProps {
  id: string;
}

const EditBar = ({ id }: EditBarProps) => (
  <div
    className={cn([
      'w-full',
      'h-[5rem]',
      'flex',
      'justify-end',
      'px-[20rem]',
      'bg-white',
      'fixed',
      'bottom-0',
      'items-center',
      'border-t-[0.0625rem]',
      'border-gray-100',
    ])}
  >
    <button
      className={cn([
        'px-[1rem]',
        'py-[0.5rem]',
        'flex',
        'gap-[0.5rem]',
        'text-[0.875rem]',
        'font-normal',
        'font-semibold',
        'leading-[1.5rem]',
        'bg-blue-600',
        'text-white',
        'rounded-[0.375rem]',
        'items-center',
        'h-[2.5rem]',
      ])}
      type="submit"
      form={id}
    >
      <EditCheckIcon />
      원서 수정 완료
    </button>
  </div>
);

export default EditBar;
