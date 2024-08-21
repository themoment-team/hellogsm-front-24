import { ScoreRegister } from 'shared';
import { GetMyOneseoType } from 'types';

interface RegisterStep4PageProps {
  // eslint-disable-next-line @rushstack/no-new-null
  data: GetMyOneseoType | null;
}

const RegisterStep4Page = ({ data }: RegisterStep4PageProps) => (
  <ScoreRegister data={data} type="client" />
);

export default RegisterStep4Page;
