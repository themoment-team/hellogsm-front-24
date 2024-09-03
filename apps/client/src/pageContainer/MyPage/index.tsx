'use client';

import { useGetMyMemberInfo, useGetMyOneseo } from 'api';
import { useRouter } from 'next/navigation';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'shared';
import { GetMyOneseoType } from 'types';

import { AlertIcon, DocumentIcon, ParticleIcon, ProfileIcon } from 'client/assets';
import { useLogout } from 'client/hooks';

import { cn } from 'shared/lib/utils';

interface MyInfoProps {
  initialData: GetMyOneseoType | undefined;
}

const MyPage = ({ initialData }: MyInfoProps) => {
  const { push } = useRouter();

  const { data, refetch } = useGetMyOneseo({
    initialData: initialData,
  });

  const { data: memberInfo } = useGetMyMemberInfo();

  const handleLogout = useLogout(refetch);

  const submitCode = data?.submitCode;
  const wantedScreening = data?.wantedScreening;
  const desiredMajors = data?.desiredMajors;
  const name = memberInfo?.name;

  const departments = [
    desiredMajors?.firstDesiredMajor,
    desiredMajors?.secondDesiredMajor,
    desiredMajors?.thirdDesiredMajor,
  ];

  const relatedDocuments = [
    { icon: <ParticleIcon />, text: '입학원서 다운로드', path: '/print' },
    { icon: <DocumentIcon />, text: '제출서류 다운로드', path: '/입학제출서류.hwp' },
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
              {data === undefined ? (
                <p className={cn('text-slate-500', 'text-[1.25rem]/[1.75rem]', 'font-normal')}>
                  원서를 아직 작성하지 않았습니다.
                </p>
              ) : (
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
              )}
            </div>
          </div>
          {data === undefined ? (
            <div className={cn('flex', 'items-center', 'gap-2')}>
              <Button variant="outline" onClick={() => push('/register?step=1')}>
                원서 작성하기
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className={cn('text-red-600')}>
                    로그아웃
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md" showCloseIcon={false}>
                  <DialogHeader>
                    <DialogTitle>Hello,GSM에 로그아웃 하시겠습니까?</DialogTitle>
                  </DialogHeader>

                  <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                      <Button variant="outline">취소</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="button" onClick={handleLogout}>
                        로그아웃
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <>
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
                          <p
                            className={cn('text-slate-900', 'text-[1rem]/[1.75rem]', 'font-normal')}
                          >
                            {doc.text}
                          </p>
                        </div>

                        <Button onClick={() => push(doc.path)} variant="download">
                          다운로드
                        </Button>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
