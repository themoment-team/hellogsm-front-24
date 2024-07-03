'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SemesterForm } from 'client/components';
import { scoreFormSchema } from 'client/schemas';
import { ScoreFormType } from 'client/types';

const semesterArray = [
  { title: '1학년 1학기', id: 'score1_1' },
  { title: '1학년 2학기', id: 'score1_2' },
  { title: '2학년 1학기', id: 'score2_1' },
  { title: '2학년 2학기', id: 'score2_2' },
  { title: '3학년 1학기', id: 'score3_1' },
] as const;

const TestCalculatePage = () => {
  const { register, handleSubmit } = useForm<ScoreFormType>({
    resolver: zodResolver(scoreFormSchema),
  });

  const handleFormSubmit: SubmitHandler<ScoreFormType> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-lvh items-center justify-center">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col items-center">
        <div className="flex gap-6">
          {semesterArray.map(({ title, id }) => (
            <SemesterForm title={title} id={id} register={register} key={id} />
          ))}
        </div>
        <button className="pointer mt-[100px] select-none rounded-[10px] border border-[#0F0921] px-[87.5px] py-[10px] text-[28px]/[40.54px] font-[700] text-[#0F0921]">
          저장
        </button>
      </form>
    </div>
  );
};

export default TestCalculatePage;
