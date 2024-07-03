'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SemesterForm } from 'client/components';
import { scoreFormSchema } from 'client/schemas';
import { ScoreFormType } from 'client/types';

const TestCalculatePage = () => {
  const { register, handleSubmit } = useForm<ScoreFormType>({
    resolver: zodResolver(scoreFormSchema),
  });

  const handleFormSubmit: SubmitHandler<ScoreFormType> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-lvh items-center justify-center">
      <div className="flex flex-col items-center">
        <form className="flex gap-6">
          <SemesterForm title="1학년 1학기" register={register} />
          <SemesterForm title="1학년 2학기" register={register} />
          <SemesterForm title="2학년 1학기" register={register} />
          <SemesterForm title="2학년 2학기" register={register} />
          <SemesterForm title="3학년 1학기" register={register} />
        </form>
        <button
          onClick={handleSubmit(handleFormSubmit)}
          className="mt-[100px] rounded-[10px] border border-[#0F0921] px-[87.5px] py-[10px] text-[28px]/[40.54px] font-[700] text-[#0F0921]"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default TestCalculatePage;
