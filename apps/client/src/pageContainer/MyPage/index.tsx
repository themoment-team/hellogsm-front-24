'use client';

import { Button } from 'shared';
import { GetMyOneseoType } from 'types';

import { AlertIcon, DocumentIcon, ParticleIcon, ProfileIcon } from 'client/assets';

import { cn } from 'shared/lib/utils';

interface MyInfoProps {
  data: GetMyOneseoType | undefined;
}

const MyPage = ({ data }: MyInfoProps) => {
  const submitCode = data?.submitCode;
  const wantedScreening = data?.wantedScreening;
  const desiredMajors = data?.desiredMajors;
  const name = data?.privacyDetail.name;

  const departments = [
    desiredMajors?.firstDesiredMajor,
    desiredMajors?.secondDesiredMajor,
    desiredMajors?.thirdDesiredMajor,
  ];

  const relatedDocuments = [
    { icon: <ParticleIcon />, text: '입학원서 다운로드' },
    { icon: <DocumentIcon />, text: '제출서류 다운로드' },
  ];

  const screeningLabels: Record<string, string> = {
    GENERAL: '일반전형',
    SPECIAL: '특별전형',
    EXTRA_VETERANS: '정원 외 특별전형',
    EXTRA_ADMISSION: '정원 외 특별전형',
  };

  const screeningLabel = wantedScreening ? screeningLabels[wantedScreening] : '전형 없음';

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
                <div
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
                    접수번호 {submitCode}
                  </p>
                </div>
                <div
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
                    {screeningLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={cn('flex', 'flex-col', 'w-full', 'gap-2')}>
            <p className={cn('text-slate-600', 'text-body1', 'font-semibold')}>지원학과 조회</p>
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
                    'w-[10.75rem]',
                  )}
                >
                  <p className={cn('text-slate-600', 'text-[1rem]/[1.75rem]', 'font-normal')}>
                    {index + 1}지망 : {dept}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={cn('w-full', 'flex', 'flex-col', 'gap-3')}>
            <div className={cn('flex', 'flex-col', 'w-full', 'gap-2')}>
              <p className={cn('text-slate-600', 'text-body1', 'font-semibold')}>
                관련서류 다운로드
              </p>
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
            </div>
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
