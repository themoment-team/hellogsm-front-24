import { MyTestResultType } from 'types';

import { BlurIcon, HelloGSMIcon } from 'client/assets';

import { Button, Dialog, DialogContent, DialogTitle } from 'shared/components';
import { cn } from 'shared/lib/utils';

interface PassResultProps {
  isPassOpen: boolean;
  setIsPassOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resultInfo: MyTestResultType | undefined;
  isFinishFirstTest: boolean;
}

const PassResultDialog = ({
  isPassOpen,
  setIsPassOpen,
  resultInfo,
  isFinishFirstTest,
}: PassResultProps) => {
  const firstTestPass = isFinishFirstTest && resultInfo?.firstTestPassYn === 'YES';
  const secondTestPass = !isFinishFirstTest && resultInfo?.secondTestPassYn === 'YES';

  const resultMessages = {
    firstTestPassYes: {
      title: (
        <>
          축하합니다! 김하온 님은 1차 서류 전형에 <span className={cn('text-sky-600')}>합격</span>{' '}
          하셨습니다.
        </>
      ),
      message: (
        <>
          2차 직무적성평가는 10월 25일 14:30 ~ 16:30에 진행되오니
          <br />
          늦지 않게 본교에 방문해 주시기 바랍니다.
        </>
      ),
    },
    firstTestPassNo: {
      title: (
        <>
          김하온 님은 1차 서류 전형에 <span className={cn('text-red-600')}>불합격</span> 하셨습니다.
        </>
      ),
      message: (
        <>
          광주소프트웨어마이스터고등학교에 지원해 주셔서
          <br />
          진심으로 감사드립니다.
        </>
      ),
    },
    secondTestPassYes: {
      title: (
        <>
          축하합니다! 김하온 님은 <span className={cn('text-sky-600')}>최종합격</span> 하셨습니다.
        </>
      ),
      message: <>학과목 배정은 10월 10일 10:10에 본 사이트에서 확인하실 수 있습니다.</>,
    },
    secondTestPassNo: {
      title: (
        <>
          김하온 님은 최종 <span className={cn('text-red-600')}>불합격</span> 하셨습니다.
        </>
      ),
      message: (
        <>
          광주소프트웨어마이스터고등학교에 지원해 주셔서
          <br />
          진심으로 감사드립니다.
        </>
      ),
    },
  };

  const resultKey = isFinishFirstTest
    ? firstTestPass
      ? 'firstTestPassYes'
      : 'firstTestPassNo'
    : secondTestPass
      ? 'secondTestPassYes'
      : 'secondTestPassNo';

  const { title, message } = resultMessages[resultKey];

  return (
    <Dialog open={isPassOpen}>
      <DialogTitle />
      <DialogContent
        className={cn('w-[645px]', 'h-[380px]', 'p-0', '!rounded-[20px]')}
        onClose={() => setIsPassOpen(false)}
      >
        <div className={cn('absolute', 'top-[100px]', 'right-[75px]')}>
          <BlurIcon color="#A8E3FF" />
        </div>
        <div className={cn('absolute', 'top-[50px]', 'left-[100px]')}>
          <BlurIcon color="#FCFFAB" />
        </div>
        <div className={cn('absolute', 'bottom-[50px]', 'left-[100px]')}>
          <BlurIcon color="#6BB6FF" />
        </div>
        <div className={cn('flex', 'flex-col', 'gap-8', 'justify-center', 'items-center', 'z-10')}>
          <div className={cn('flex', 'flex-col', 'items-center', 'gap-10')}>
            <HelloGSMIcon />
            <div className={cn('flex', 'flex-col', 'items-center', 'gap-3')}>
              <h3 className={cn('text-[1.25rem]/[1.5rem]', 'font-semibold')}>{title}</h3>
              <p
                className={cn(
                  'text-gray-500',
                  'text-[1rem]/[1.5rem]',
                  'font-medium',
                  'text-center',
                )}
              >
                {message}
              </p>
            </div>
          </div>
          <Button
            variant="fill"
            className={cn('w-[10.625rem]', 'text-[1rem]/[1.5rem]', 'font-semibold')}
            onClick={() => setIsPassOpen(false)}
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PassResultDialog;
