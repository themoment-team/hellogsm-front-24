'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { basicRegisterType } from 'types';

import {
  ApplyRegister,
  BasicRegister,
  ConfirmBar,
  GuardianRegister,
  StepBar,
} from 'shared/components';
import { cn } from 'shared/lib/utils';
import { basicRegisterSchema } from 'shared/schemas';

interface Props {
  param: string;
}

const StepsContianer = ({ param }: Props) => {
  const { register, handleSubmit, setValue, watch } = useForm<basicRegisterType>({
    resolver: zodResolver(basicRegisterSchema),
    defaultValues: {
      img: '',
      address: '',
      detailAddress: '',
      phoneNumber: '',
      category: '',
      middleSchool: '',
      year: '',
      month: '',
      screening: '',
      choice: ['', '', ''],
      parentsName: '',
      parentsNumber: '',
      relationship: '',
      otherRelationship: '',
      teacherName: '',
      teacherNumber: '',
    },
  });

  const example = {
    name: '김재균',
    birth: '2007-12-08',
    sex: '남자',
  };

  return (
    <>
      <div
        className={cn([
          'w-full',
          'h-full',
          'bg-slate-50',
          'pt-[3.56rem]',
          'flex',
          'justify-center',
        ])}
      >
        <div className={cn(['w-[66.5rem]', 'flex', 'flex-col', 'bg-white'])}>
          <StepBar param={param} handleSubmit={handleSubmit} watch={watch} />
          <div
            className={cn([
              'flex',
              'justify-center',
              'w-full',
              'h-fit',
              'px-[2rem]',
              'py-[1.5rem]',
              'bg-white',
            ])}
          >
            {param === '1' && (
              <BasicRegister
                name={example.name}
                birth={example.birth}
                sex={example.sex}
                register={register}
                setValue={setValue}
              />
            )}
            {param === '2' && <ApplyRegister setValue={setValue} />}
            {param === '3' && <GuardianRegister register={register} setValue={setValue} />}
          </div>
        </div>
      </div>
      <ConfirmBar />
    </>
  );
};

export default StepsContianer;
