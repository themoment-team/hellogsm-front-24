'use client';

import { useForm } from 'react-hook-form';

import { ScoreSelect } from 'client/components';

const array = [0, 1, 2, 3, 4, 5, 6, 7];

interface ScoreForm {
  score1_1: string[];
  score1_2: string[];
  score2_1: string[];
  score2_2: string[];
  score3_1: string[];
}

const TestCalculatePage = () => {
  const { register, handleSubmit } = useForm<ScoreForm>({});

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="h-lvh">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {array.map((item, index) => (
          <ScoreSelect key={item} {...register(`score1_1.${index}`)} />
        ))}
        {array.map((item, index) => (
          <ScoreSelect key={item} {...register(`score1_2.${index}`)} />
        ))}
        {array.map((item, index) => (
          <ScoreSelect key={item} {...register(`score2_1.${index}`)} />
        ))}
        {array.map((item, index) => (
          <ScoreSelect key={item} {...register(`score2_2.${index}`)} />
        ))}
        {array.map((item, index) => (
          <ScoreSelect key={item} {...register(`score3_1.${index}`)} />
        ))}
      </form>
    </div>
  );
};

export default TestCalculatePage;
