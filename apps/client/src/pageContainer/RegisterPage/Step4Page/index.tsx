import { ScoreRegister } from 'shared';
import { GetMyOneseoType } from 'types';

interface RegisterStep4PageProps {
  data: GetMyOneseoType | undefined;
}

const RegisterStep4Page = ({ data }: RegisterStep4PageProps) => (
  <ScoreRegister data={data} type="client" />
);

export default RegisterStep4Page;
