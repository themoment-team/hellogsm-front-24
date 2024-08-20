'use client';

import { useState } from 'react';

import { Input } from 'shared';

import { FormItem, RadioButton } from 'client/components';

import { cn } from 'shared/lib/utils';

const GuardianRegister = () => {
  const [selectedRelationship, setSelectedRelationship] = useState<string>('');

  const handleRadioChange = (value: string) => {
    setSelectedRelationship(value);
  };

  return (
    <div className={cn('flex', 'px-[2rem]', 'pt-[1.5rem]', 'pb-[2.5rem]')}>
      <div className={cn('flex', 'w-full', 'flex-col', 'items-start', 'gap-10')}>
        <div className={cn('flex', 'flex-col', 'items-start', 'gap-[0.125rem]')}>
          <h1 className={cn('text-gray-900', 'text-[1.25rem]/[1.75rem]', 'font-semibold')}>
            보호자 / 담임선생님 정보를 입력해 주세요.
          </h1>
          <p className={cn('text-gray-600', 'text-[0.875rem]/[1.25rem]', 'font-normal')}>
            회원가입 시 입력한 기본 정보가 노출됩니다.
          </p>
        </div>

        <div className={cn('flex', 'items-start', 'gap-12')}>
          <div className={cn('flex', 'w-[29.75rem]', 'flex-col', 'items-start', 'gap-8')}>
            <FormItem
              text={'보호자 이름 / 연락처'}
              className="gap-1"
              required={true}
              fullWidth={true}
            >
              <Input placeholder="보호자 이름 입력" width="full" />
              <Input placeholder="보호자 연락처 입력" width="full" />
            </FormItem>
            <div className={cn('flex', 'flex-col', 'gap-3')}>
              <RadioButton
                title={'보호자 관계'}
                options={['부', '모', '기타 (직접입력)']}
                required={true}
                onChange={handleRadioChange}
              />
              {selectedRelationship === '기타 (직접입력)' && <Input placeholder="직접 입력" />}
            </div>
          </div>
          <div className={cn('flex', 'w-[29.75rem]', 'flex-col', 'items-start', 'gap-8')}>
            <FormItem
              text={'담임선생님 이름 / 연락처'}
              className="gap-1"
              required={true}
              fullWidth={true}
            >
              <Input placeholder="담임선생님 이름 입력" width="full" />
              <Input placeholder="담임선생님 연락처 입력" width="full" />
            </FormItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardianRegister;
