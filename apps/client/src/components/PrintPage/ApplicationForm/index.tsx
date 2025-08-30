import { OneseoStatusType } from 'types';

import OneseoStatus from 'client/components/OneseoStatus';

import { cn } from 'shared/lib/utils';

/* eslint-disable-next-line no-restricted-imports */
import ApplicationPledge from '../ApplicationPledge';
/* eslint-disable-next-line no-restricted-imports */
import PersonalInfoTable from '../PersonalInfoTable';

const ApplicationForm = ({ oneseo }: OneseoStatusType) => {
  const date = new Date();
  const targetDate = date.getFullYear() + 1;

  return (
    <div
      className={cn(
        'flex h-fit flex-col items-center justify-center overflow-hidden bg-white p-2 text-[1vh]',
      )}
    >
      <div className={cn('relative', 'z-[2]', 'w-[63vh]')}>
        <div
          className={cn(
            'flex h-fit flex-col items-center justify-center overflow-hidden bg-white p-2 text-[1vh]',
          )}
        >
          <div className={cn('relative', 'z-[2]', 'w-[63vh]')}>
            <div
              id="sample"
              className={cn(
                'absolute z-[-1] rotate-[-30deg] select-none text-center text-[40vh] text-gray-200',
              )}
            >
              견본
            </div>

            <p>[서식 1]</p>
            <div className={cn('text-center', 'text-[3vh]', 'font-bold')}>
              광주소프트웨어마이스터고등학교 입학원서
            </div>

            <div className={cn('flex', 'items-end', 'justify-between')}>
              <div className={cn('mt-[1.5vh]', 'text-lg', 'font-bold', 'leading-[2vh]')}>
                {targetDate}학년도 신입생 입학전형
              </div>
              <div>
                <table>
                  <tr>
                    <th
                      className={cn(
                        'w-20 border border-b-0 border-black bg-[#e9e9e9] p-[0.2vh] align-middle font-medium',
                      )}
                    >
                      접수번호
                    </th>
                    <td
                      className={cn('w-40', 'border', 'border-b-0', 'border-black', 'text-center')}
                    >
                      {oneseo.submitCode}
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <div className={cn('border', 'border-r-0', 'border-t-0', 'border-black')}>
              <PersonalInfoTable oneseo={oneseo} />
              <OneseoStatus oneseo={oneseo} />
              <ApplicationPledge oneseo={oneseo} />
            </div>

            <div className={cn('my-4', 'text-center')}>
              2차 전형 응시 준비물 : 신분증[학생증], 필기구 등
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
