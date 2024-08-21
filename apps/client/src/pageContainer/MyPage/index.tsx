'use client';

import { Button } from 'shared';

import { AlertIcon, DocumentIcon, ParticleIcon, ProfileIcon } from 'client/assets';
import { FormItem } from 'client/components';

import { cn } from 'shared/lib/utils';

interface MyInfoProps {
  name: string;
  number: number;
  admission: string;
  departments: string[];
}

const MyPage = ({ name, number, admission, departments }: MyInfoProps) => {
  const relatedDocuments = [
    { icon: <ParticleIcon />, text: '입학원서 다운로드' },
    { icon: <DocumentIcon />, text: '제출서류 다운로드' },
  ];

  const infoItems = [
    { label: '접수번호', value: number },
    { label: '', value: admission },
  ];

  return (
    <div className={cn('flex', 'w-full', 'h-[100vh]', 'justify-center', 'bg-white')}>
      <div className="mt-20">
        <div
          className={cn('flex', 'flex-col', '33.5rem', 'gap-10', 'justify-center', 'items-center')}
        >
          <div className={cn('flex', 'w-fit', 'flex-col', 'items-center', 'gap-5')}>
            <div
              className={cn(
                'flex',
                'w-[5.5rem]',
                'h-[5.5rem]',
                'items-center',
                'justify-center',
                'rounded-3xl',
                'bg-slate-100',
              )}
            >
              <ProfileIcon />
            </div>
            <div className={cn('flex', 'flex-col', 'gap-3', 'items-center')}>
              <p className={cn('text-slate-800', 'text-h3', 'font-semibold')}>{name} 님</p>
              <div className={cn('flex', 'items-center', 'gap-2')}>
                {infoItems.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex',
                      'px-3',
                      'py-1',
                      'items-center',
                      'justify-center',
                      'rounded-[3.5rem]',
                      'bg-slate-100',
                    )}
                  >
                    <p className={cn('text-slate-500', 'text-[0.875rem]/[1.25rem]', 'font-normal')}>
                      {item.label} {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <FormItem text={'지원학과 조회'} className="gap-2" fullWidth={true}>
            <div className={cn('w-full', 'flex', 'items-center', 'justify-between', 'gap-2')}>
              {departments.map((dept, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex',
                    'flex-col',
                    'px-[1.1875rem]',
                    'py-4',
                    'justify-center',
                    'items-center',
                    'rounded-[0.375rem]',
                    'border',
                    'border-solid',
                    'border-slate-300',
                  )}
                >
                  <p className={cn('text-slate-600', 'text-[1rem]/[1.75rem]', 'font-normal')}>
                    {index + 1}지망 : {dept}
                  </p>
                </div>
              ))}
            </div>
          </FormItem>

          <div className={cn('w-full', 'flex', 'flex-col', 'gap-3')}>
            <FormItem text={'관련서류 다운로드'} className="gap-2" fullWidth={true}>
              <div className={cn('flex', 'flex-col', 'gap-2')}>
                {relatedDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex',
                      'p-4',
                      'items-center',
                      'justify-between',
                      'rounded-[0.375rem]',
                      'border',
                      'border-solid',
                      'border-slate-300',
                    )}
                  >
                    <div className={cn('flex', 'items-center', 'gap-3')}>
                      {doc.icon}
                      <p className={cn('text-slate-900', 'text-[1rem]/[1.75rem]', 'font-normal')}>
                        {doc.text}
                      </p>
                    </div>

                    <Button variant="download">다운로드</Button>
                  </div>
                ))}
              </div>
            </FormItem>
            <div
              className={cn(
                'flex',
                'px-3',
                'py-4',
                'items-start',
                'gap-2',
                'rounded-[0.375rem]',
                'bg-slate-100',
              )}
            >
              <AlertIcon />
              <span className={cn('text-slate-500', 'text-[0.875rem]/[1.5rem]', 'font-normal')}>
                <strong>
                  입학원서, 성적입력확인서, 개인정보 수집 및 활용동의서, 학부모 동의서
                </strong>
                를 출력 <br />
                하여 원서와 함께 행정실에 제출해야 합니다.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
