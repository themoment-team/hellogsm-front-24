'use client';

import { useState } from 'react';

import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { basicRegisterType } from 'types';

import { RadioButton, SearchDialog } from 'shared/components';
import {
  Input,
  CustomFormItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'shared/components';
import { cn } from 'shared/lib/utils';

const PERMIT_YEAR = 3;

interface ApplyRegisterType {
  setValue: UseFormSetValue<basicRegisterType>;
  watch: UseFormWatch<basicRegisterType>;
}

const ApplyRegister = ({ setValue, watch }: ApplyRegisterType) => {
  const [choices, setChoices] = useState<string[]>(['', '', '']);
  const [selectedSchool, setSelectedSchool] = useState<string>('');

  const targetYear = new Date().getFullYear() + 1;

  const departments = ['소프트웨어개발과', '스마트IOT과', '인공지능과'];
  const categoryValues = ['졸업자', '졸업예정', '검정고시'];
  const screeningValues = ['일반전형', '사회통합전형', '정원 외 특별전형'];

  const departmentDetails = [
    {
      name: '소프트웨어개발과',
      description: 'C, C++, JAVA, 모바일 등',
    },
    {
      name: '스마트 IOT(Internet Of Things)과',
      description: '리눅스, 라즈베리파이, 아두이노, 하드웨어 등',
    },
    {
      name: '인공지능(AI)과',
      description: '빅데이터, 사물인터넷, 머신러닝, 딥러닝 등',
    },
  ];

  const getAvailableDepartments = (exclude: string[]) => {
    return departments.filter((dept) => !exclude.includes(dept));
  };

  const handleChoiceChange = (value: string, index: number) => {
    setChoices((prevChoices) => {
      const updatedChoices = [...prevChoices];
      updatedChoices[index] = value;
      setValue('choice', updatedChoices);
      return updatedChoices;
    });
  };

  const handlCategoryChange = (value: string) => {
    if (categoryValues.includes(value)) {
      setValue('category', value);
      return;
    }
  };

  const handleScreeningChange = (value: string) => {
    if (screeningValues.includes(value)) {
      setValue('screening', value);
      return;
    }
  };

  const handleYearChange = (value: string) => {
    setValue('year', value);
  };

  const handleMonthChange = (value: string) => {
    setValue('month', value);
  };

  return (
    <div className={cn('flex', 'px-[2rem]', 'pt-[1.5rem]', 'pb-[2.5rem]')}>
      <div className={cn('flex', 'w-full', 'flex-col', 'items-start', 'gap-10')}>
        <div className={cn('flex', 'flex-col', 'items-start', 'gap-[0.125rem]')}>
          <h1 className={cn('text-gray-900', 'text-[1.25rem]/[1.75rem]', 'font-semibold')}>
            지원 정보를 입력해 주세요.
          </h1>
          <p className={cn('text-gray-600', 'text-[0.875rem]/[1.25rem]', 'font-normal')}>
            회원가입 시 입력한 기본 정보가 노출됩니다.
          </p>
        </div>

        <div className={cn('flex', 'items-start', 'gap-12')}>
          <div className={cn('flex', 'w-[29.75rem]', 'flex-col', 'items-start', 'gap-10')}>
            <RadioButton
              title={'지원자 유형'}
              options={['졸업자', '졸업예정', '검정고시']}
              required={true}
              onChange={handlCategoryChange}
              watch={watch}
              watchContent="category"
            />

            <CustomFormItem
              text={'출신 중학교 & 졸업일'}
              className="gap-1"
              required={true}
              fullWidth={true}
            >
              <div className={cn('flex', 'gap-2')}>
                <Input
                  placeholder="내 중학교 찾기"
                  width="full"
                  disabled={true}
                  value={watch('schoolName') ? watch('schoolName') : selectedSchool}
                />
                <SearchDialog setSelectedSchool={setSelectedSchool} setValue={setValue} />
              </div>
              <div className={cn('flex', 'w-full', 'justify-between')}>
                <Select onValueChange={handleYearChange} value={watch('year')}>
                  <SelectTrigger className="w-[14.6785rem]">
                    <SelectValue placeholder="년도 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>년도 선택</SelectLabel>
                      {Array.from(
                        { length: PERMIT_YEAR + 1 },
                        (_, index) => targetYear - index,
                      ).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select onValueChange={handleMonthChange} value={watch('month')}>
                  <SelectTrigger className="w-[14.6785rem]">
                    <SelectValue placeholder="월 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>월 선택</SelectLabel>
                      {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                        <SelectItem key={month} value={month.toString()}>
                          {month}월
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CustomFormItem>
          </div>
          <div className={cn('flex', 'w-[29.75rem]', 'flex-col', 'items-start', 'gap-10')}>
            <RadioButton
              title={'전형'}
              options={['일반전형', '사회통합전형', '정원 외 특별전형']}
              required={true}
              onChange={handleScreeningChange}
              watch={watch}
              watchContent="screening"
            />
            <div className={cn('flex', 'flex-col', 'gap-3', 'w-full')}>
              <div className={cn('flex', 'flex-col', 'items-start', 'gap-1.5', 'w-full')}>
                <CustomFormItem
                  text={'지원학과'}
                  className="gap-1"
                  required={true}
                  fullWidth={true}
                >
                  <div className={cn('flex', 'w-full', 'justify-between')}>
                    {choices.map((choice, index) => (
                      <Select
                        key={index}
                        value={watch('choice')[index] || choice}
                        onValueChange={(value) => handleChoiceChange(value, index)}
                        disabled={index > 0 && !choices[index - 1]}
                      >
                        <SelectTrigger className="w-[9.3785rem]">
                          <SelectValue placeholder={`${index + 1}지망`} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>{`${index + 1}지망 선택`}</SelectLabel>
                            {getAvailableDepartments(choices.slice(0, index)).map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    ))}
                  </div>
                </CustomFormItem>
              </div>
              <div
                className={cn(
                  'flex',
                  'flex-col',
                  'w-full',
                  'h-[5.75rem]',
                  'justify-center',
                  'items-center',
                  'bg-slate-100',
                  'rounded-md',
                )}
              >
                <ul
                  className={cn(
                    'flex',
                    'flex-col',
                    'items-start',
                    'w-[26.5rem]',
                    'gap-1',
                    'list-disc',
                  )}
                >
                  {departmentDetails.map((dept, index) => (
                    <li key={index} className={cn('text-slate-600', 'text-[0.75rem]/[1.125rem]')}>
                      <span className="font-semibold">{dept.name}</span>
                      <span className="font-normal"> - {dept.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyRegister;
