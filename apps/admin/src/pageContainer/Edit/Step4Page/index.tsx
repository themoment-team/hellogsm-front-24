import { ScoreRegister } from 'shared';
import { GetMyOneseoType } from 'types';

interface EditStep4PageProps {
  data: GetMyOneseoType;
  userId: number;
}

const EditStep4Page = ({ data }: EditStep4PageProps) => {
  return <ScoreRegister data={data} type="admin" />;
};

export default EditStep4Page;
