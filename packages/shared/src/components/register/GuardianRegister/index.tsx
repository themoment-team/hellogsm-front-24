'use client';

import { useEffect } from 'react';

import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { basicRegisterType } from 'types';

import { CustomFormItem, RadioButton } from 'shared/components';
import { Input } from 'shared/components';
import { cn } from 'shared/lib/utils';

interface GuardianType {
  register: UseFormRegister<basicRegisterType>;
  setValue: UseFormSetValue<basicRegisterType>;
  watch: UseFormWatch<basicRegisterType>;
}

const GuardianRegister = ({ register, setValue, watch }: GuardianType) => {
  const { category: graduationType } = watch();

  useEffect(() => {
    if (watch('relationship') === '' && watch('otherRelationship') !== '') {
      setValue('relationship', '기타 (직접입력)');
    }
  }, []);

  const handleRadioChange = (value: string) => {
    if (value === '부' || value === '모' || value === '기타 (직접입력)') {
      setValue('relationship', value);
    } else {
      setValue('relationship', '기타 (직접입력)');
      setValue('otherRelationship', value);
    }
  };

  return (
    <div className={cn('flex', 'px-8', 'pt-6', 'pb-10')}>
      <div className={cn('flex', 'w-full', 'flex-col', 'items-start', 'gap-10')}>
        <div className={cn('flex', 'flex-col', 'items-start', 'gap-0.5')}>
          <h1 className={cn('text-gray-900', 'text-[1.25rem]/[1.75rem]', 'font-semibold')}>
            보호자 / 담임선생님 정보를 입력해 주세요.
          </h1>
          <p className={cn('text-gray-600', 'text-[0.875rem]/[1.25rem]', 'font-normal')}>
            회원가입 시 입력한 기본 정보가 노출됩니다.
          </p>
        </div>

        <div className={cn('flex', 'items-start', 'gap-12')}>
          <div className={cn('flex', 'w-[29.75rem]', 'flex-col', 'items-start', 'gap-8')}>
            <CustomFormItem
              text={'보호자 이름 / 연락처'}
              className="gap-1"
              required={true}
              fullWidth={true}
            >
              <Input placeholder="보호자 이름 입력" width="full" {...register('guardianName')} />
              <Input
                placeholder="보호자 연락처 입력"
                width="full"
                {...register('guardianPhoneNumber')}
                value={watch('guardianPhoneNumber')}
              />
            </CustomFormItem>
            <div className={cn('flex', 'flex-col', 'gap-3')}>
              <RadioButton
                title={'보호자 관계'}
                options={['부', '모', '기타 (직접입력)']}
                required={true}
                onChange={handleRadioChange}
                watch={watch}
                watchContent="relationship"
              />
              {watch('relationship') === '기타 (직접입력)' && (
                <Input
                  placeholder="직접 입력"
                  {...register('otherRelationship')}
                  value={watch('otherRelationship')}
                />
              )}
            </div>
          </div>
          <div className={cn('flex', 'w-[29.75rem]', 'flex-col', 'items-start', 'gap-8')}>
            {graduationType === '졸업예정' && (
              <CustomFormItem
                text={'담임선생님 이름 / 연락처'}
                className="gap-1"
                required={true}
                fullWidth={true}
              >
                <Input
                  placeholder="담임선생님 이름 입력"
                  width="full"
                  {...register('schoolTeacherName')}
                  value={watch('schoolTeacherName')!}
                />
                <Input
                  placeholder="담임선생님 연락처 입력"
                  width="full"
                  {...register('schoolTeacherPhoneNumber')}
                  value={watch('schoolTeacherPhoneNumber')!}
                />
              </CustomFormItem>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardianRegister;
