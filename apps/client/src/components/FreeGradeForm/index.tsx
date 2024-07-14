import { UseFormRegister } from 'react-hook-form';

import { SemesterForm } from 'client/components';
import { ScoreFormType, SemesterType } from 'client/types';

const freeGradeArray: SemesterType[] = [
  { title: '2학년 1학기', id: 'score2_1' },
  { title: '2학년 2학기', id: 'score2_2' },
  { title: '3학년 1학기', id: 'score3_1' },
] as const;

interface FreeGradeFormProps {
  register: UseFormRegister<ScoreFormType>;
  subjectArray: string[];
}

const FreeGradeForm: React.FC<FreeGradeFormProps> = ({ register, subjectArray }) => {
  return (
    <>
      {freeGradeArray.map(({ id, title }) => (
        <SemesterForm
          key={id}
          title={title}
          id={id}
          register={register}
          subjectArray={subjectArray}
        />
      ))}
    </>
  );
};

export default FreeGradeForm;
