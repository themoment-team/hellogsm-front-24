'use client';

import { useState } from 'react';

import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'shared';

import { FormItem, RadioButton } from 'client/components';
import { SearchDialog } from 'client/components';

import { cn } from 'shared/lib/utils';

const PERMIT_YEAR = 3;

const ApplyRegister = () => {
  const [choices, setChoices] = useState<string[]>(['', '', '']);
  const [keyword, setKeyword] = useState<string>('');

  const targetYear = new Date().getFullYear() + 1;

  const schoolName = keyword || '내 중학교 찾기';

  const departments = ['소프트웨어개발과', '스마트IOT과', '인공지능과'];

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
      return updatedChoices;
    });
  };

  return (
    <div className={cn('flex', 'px-[2rem]', 'pt-[1.5rem]', 'pb-[2.5rem]')}>
      <div className={cn('flex', 'w-full', 'h-[28.75rem]', 'flex-col', 'items-start', 'gap-10')}>
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
            />

            <FormItem
              text={'출신 중학교 & 졸업일'}
              className="gap-1"
              required={true}
              fullWidth={true}
            >
              <div className={cn('flex', 'gap-2')}>
                <Input placeholder={schoolName} width="full" disabled={true} />
                <SearchDialog keyword={keyword} setKeyword={setKeyword} />
              </div>
              <div className={cn('flex', 'w-full', 'justify-between')}>
                <Select>
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
                <Select>
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
            </FormItem>
          </div>
          <div className={cn('flex', 'w-[29.75rem]', 'flex-col', 'items-start', 'gap-10')}>
            <RadioButton
              title={'전형'}
              options={['일반전형', '사회통합전형', '정원 외 특별전형']}
              required={true}
            />
            <div className={cn('flex', 'flex-col', 'gap-3', 'w-full')}>
              <div className={cn('flex', 'flex-col', 'items-start', 'gap-1.5', 'w-full')}>
                <FormItem text={'지원학과'} className="gap-1" required={true} fullWidth={true}>
                  <div className={cn('flex', 'w-full', 'justify-between')}>
                    {choices.map((choice, index) => (
                      <Select
                        key={index}
                        value={choice}
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
                </FormItem>
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
