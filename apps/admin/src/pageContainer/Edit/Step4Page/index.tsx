import { ScoreRegister } from 'shared';
import { GetMyOneseoType } from 'types';

import { cn } from 'shared/lib/utils';

interface EditStep4PageProps {
  data: GetMyOneseoType;
  memberId: number;
}

const EditStep4Page = ({ data, memberId }: EditStep4PageProps) => {
  return (
    <>
      <div className={cn('w-full', 'flex', 'justify-center')}>
        <div className={cn('flex', 'flex-col')}>
          {/* <StepBar /> */}
          <ScoreRegister type="admin" data={data} memberId={memberId} isStep4Clickable={false} />
          {/* isStep4Clickable={false} 부분은 다음 pr에서 수정하겠습니다 */}
        </div>
      </div>
    </>
  );
};

export default EditStep4Page;
