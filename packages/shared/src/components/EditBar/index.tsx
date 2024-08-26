import { EditCheckIcon } from 'shared/assets';
import { cn } from 'shared/lib/utils';

interface EditBarProps {
  id: string;
}

const EditBar = ({ id }: EditBarProps) => (
  <div
    className={cn([
      'w-full',
      'h-20',
      'flex',
      'justify-end',
      'px-80',
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
        'px-4',
        'py-2',
        'flex',
        'gap-2',
        'text-sm',
        'font-normal',
        'font-semibold',
        'leading-3',
        'bg-blue-600',
        'text-white',
        'rounded-md',
        'items-center',
        'h-10',
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
