/* eslint-disable @rushstack/no-new-null */

import { UseFormRegister } from 'react-hook-form';

import { SemesterForm } from 'client/components';
import { ScoreFormType, SemesterId, SemesterType } from 'client/types';

const freeSemesterArray: SemesterType[] = [
  { title: '1학년 1학기', id: 'score1_1' },
  { title: '1학년 2학기', id: 'score1_2' },
  { title: '2학년 1학기', id: 'score2_1' },
  { title: '2학년 2학기', id: 'score2_2' },
  { title: '3학년 1학기', id: 'score3_1' },
] as const;

interface FreeSemesterFormProps {
  register: UseFormRegister<ScoreFormType>;
  subjectArray: string[];
  freeSemester: SemesterId | null;
  setFreeSemester: React.Dispatch<React.SetStateAction<SemesterId | null>>;
}

const FreeSemesterForm: React.FC<FreeSemesterFormProps> = ({
  register,
  subjectArray,
  freeSemester,
  setFreeSemester,
}) => {
  return (
    <>
      {freeSemesterArray.map(({ id, title }) => (
        <SemesterForm
          key={id}
          title={title}
          id={id}
          register={register}
          subjectArray={subjectArray}
          isFreeSemester
          freeSemester={freeSemester}
          setFreeSemester={setFreeSemester}
        />
      ))}
    </>
  );
};

export default FreeSemesterForm;
