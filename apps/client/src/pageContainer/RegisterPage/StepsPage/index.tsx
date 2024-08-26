import { StepsContainer } from 'shared';
import { GetMyOneseoType } from 'types';

interface RegisterStepsPageProps {
  data: GetMyOneseoType | undefined;
  param: string;
}

const RegisterStepsPage = ({ data, param }: RegisterStepsPageProps) => (
  <StepsContainer data={data} param={param} />
);

export default RegisterStepsPage;
