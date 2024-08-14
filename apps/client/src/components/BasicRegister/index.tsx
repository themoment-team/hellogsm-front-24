'use client';

import { Input } from 'shared';

import { FormItem, UploadPhoto } from 'client/components';

import { cn } from 'shared/lib/utils';

const BasicRegister = () => {
  return (
    <div className={cn('flex', 'px-[2rem]', 'pt-[1.5rem]', 'pb-[2.5rem]')}>
      <div
        className={cn(
          'flex',
          'w-full',
          'h-[28.75rem]',
          'flex-col',
          'items-start',
          'justify-between',
        )}
      >
        <div className={cn('flex', 'flex-col', 'items-start', 'gap-[0.125rem]')}>
          <h1 className={cn('text-gray-900', 'text-[1.25rem]/[1.75rem]', 'font-semibold')}>
            기본 정보를 입력해 주세요.
          </h1>
          <p className={cn('text-gray-600', 'text-[0.875rem]/[1.25rem]', 'font-normal')}>
            회원가입 시 입력한 기본 정보가 노출됩니다.
          </p>
        </div>

        <div className={cn('flex', 'items-end', 'justify-between')}>
          <div className={cn('flex', 'w-[29.75rem]', 'flex-col', 'items-start', 'gap-[2rem]')}>
            <UploadPhoto required={true} />
            <FormItem text={'이름'} className="gap-1" required={true} fullWidth={true}>
              <Input placeholder="김재균" disabled={true} />
            </FormItem>
            <FormItem text={'이름'} className="gap-1" required={true} fullWidth={true}>
              <Input placeholder="김재균" disabled={true} />
            </FormItem>
          </div>

          <div
            className={cn('flex', 'w-[29.75rem]', 'flex-col', 'items-start', 'gap-[2.5rem]')}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BasicRegister;
