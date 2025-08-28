import { GetMyOneseoType } from 'types';

import { cn } from 'shared/lib/utils';

/* eslint-disable-next-line no-restricted-imports */
import ArtsPhysicalTable from '../ArtsPhysicalTable';
/* eslint-disable-next-line no-restricted-imports */
import ConfirmationTables from '../ConfirmationTable';
/* eslint-disable-next-line no-restricted-imports */
import ExtracurricularTable from '../ExtracurricularTable';
/* eslint-disable-next-line no-restricted-imports */
import GeneralSubjectsTable from '../GeneralSubjectsTable';

interface ScoreConfirmationFormProps {
  oneseo: GetMyOneseoType;
}

const ScoreConfirmationForm = ({ oneseo }: ScoreConfirmationFormProps) => {
  const date = new Date();
  const targetDate = date.getFullYear() + 1;

  return (
    <div
      className={cn(
        'flex h-fit flex-col items-center justify-center overflow-hidden bg-white p-2 text-[1vh]',
      )}
    >
      <div className={cn('relative', 'z-[2]', 'w-[63vh]')}>
        <div className={cn('relative', 'z-[2]', 'w-[66vh]', 'overflow-hidden')}>
          <div className={cn('relative', 'bg-white', 'p-4', 'text-black')}>
            <div
              className={cn(
                'relative',
                'z-[2]',
                'border',
                'border-gray-300',
                'bg-white',
                'p-6',
                'shadow-md',
              )}
            >
              <div
                id="sample"
                className={cn(
                  'absolute top-[-60px] z-[-2] rotate-[-30deg] transform select-none text-center text-[40vh] text-gray-200',
                )}
              >
                견본
              </div>

              <p>[서식 3]</p>
              <h1 className={cn('text-center', 'text-[1.8vh]', 'font-bold')}>
                {targetDate}학년도 광주소프트웨어마이스터고등학교 입학 전형성적 입력 확인서
              </h1>

              <div className={cn('flex', 'items-end', 'justify-between')}>
                <h2 className={cn('mt-[1.5vh]', 'text-[1.2vh]', 'leading-[2vh]')}>일반교과</h2>
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
                        className={cn(
                          'w-40',
                          'border',
                          'border-b-0',
                          'border-black',
                          'text-center',
                        )}
                      >
                        {oneseo.submitCode}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <GeneralSubjectsTable oneseo={oneseo} />

              <h2 className={cn('mt-[1.5vh]', 'text-[1.2vh]', 'leading-[2vh]')}>체육예술교과</h2>
              <ArtsPhysicalTable oneseo={oneseo} />

              <h2 className={cn('mt-[1.5vh]', 'text-[1.2vh]', 'leading-[2vh]')}>비교과</h2>
              <ExtracurricularTable oneseo={oneseo} />

              <ConfirmationTables />

              <div className={cn('mt-[2vh]', 'text-center', 'text-[1.2vh]')}>
                <p>위와 같이 입력하고 확인하였음을 증명합니다.</p>
                <div className={cn('mb-4', 'flex', 'justify-center')}>
                  <p className={cn('mr-6')}>년</p>
                  <p className={cn('mr-6')}>월</p>
                  <p>일</p>
                </div>
                <div className={cn('mt-[1vh]', 'flex', 'justify-between', 'text-[1vh]', 'text-sm')}>
                  <span>광주소프트웨어마이스터고등학교장 귀하</span>
                  <span>중학교장[직인]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreConfirmationForm;
