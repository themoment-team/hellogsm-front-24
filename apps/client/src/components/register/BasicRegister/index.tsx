'use client';

import { useState } from 'react';

import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { Button, Input, Select, SelectTrigger, SelectValue } from 'shared';

import { FormItem, RadioButton, UploadPhoto } from 'client/components';

import { cn } from 'shared/lib/utils';

interface BasicInfoType {
  name: string;
  birth: string;
  sex: string;
}

const BasicRegister = ({ name, birth, sex }: BasicInfoType) => {
  const [address, setAddress] = useState<string>('');
  const [zonecode, setZoncode] = useState<string>('');

  const daumPostCode = useDaumPostcodePopup();

  const userAddress = address && zonecode ? `${address} ${zonecode}` : '주소를 입력해 주세요';

  const birthDate = new Date(birth);
  const birthYear = birthDate.getFullYear();
  const birthMonth = String(birthDate.getMonth() + 1).padStart(2, '0');
  const birthDay = String(birthDate.getDate()).padStart(2, '0');

  const handleDaumPostCodePopupComplete = ({ address, zonecode }: Address) => {
    setAddress(address);
    setZoncode(zonecode);
  };

  const handleZipCodeButtonClick = () =>
    daumPostCode({
      popupTitle: 'Hello, GSM 2024',
      onComplete: handleDaumPostCodePopupComplete,
    });

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

        <div className={cn('flex', 'items-end', 'gap-[3rem]')}>
          <div className={cn('flex', 'w-[29.75rem]', 'flex-col', 'items-start', 'gap-[2rem]')}>
            <UploadPhoto />
            <FormItem text={'이름'} className="gap-1" required={true} fullWidth={true}>
              <Input placeholder={name} disabled={true} />
            </FormItem>
            <FormItem text={'생년월일'} className="gap-1" required={true} fullWidth={true}>
              <div className={cn('flex', 'w-full', 'justify-between')}>
                <Select>
                  <SelectTrigger className="w-[9.3785rem]" disabled={true}>
                    <SelectValue placeholder={birthYear} />
                  </SelectTrigger>
                </Select>
                <Select>
                  <SelectTrigger className="w-[9.3785rem]" disabled={true}>
                    <SelectValue placeholder={birthMonth} />
                  </SelectTrigger>
                </Select>
                <Select>
                  <SelectTrigger className="w-[9.3785rem]" disabled={true}>
                    <SelectValue placeholder={birthDay} />
                  </SelectTrigger>
                </Select>
              </div>
            </FormItem>
          </div>

          <div className={cn('flex', 'w-[29.75rem]', 'flex-col', 'items-start', 'gap-10')}>
            <RadioButton
              title={'성별'}
              options={['남자', '여자']}
              disabled={true}
              disabledOption={sex}
            />

            <div className={cn('flex', 'flex-col', 'items-start', 'gap-[0.375rem]', 'w-full')}>
              <FormItem text={'주소지'} className="gap-1" required={true} fullWidth={true}>
                <div className={cn('w-full', 'flex', 'gap-2')}>
                  <Input placeholder={userAddress} width="full" disabled={true} />
                  <Button onClick={handleZipCodeButtonClick}>주소 찾기</Button>
                </div>
              </FormItem>
              <Input placeholder="상세주소" width="full" />
            </div>

            <FormItem text={'휴대폰 번호'} className="gap-1" required={true} fullWidth={true}>
              <Input placeholder="010 1234 5678" width="full" />
            </FormItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicRegister;
