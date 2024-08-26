import { ScoreRegister } from 'shared';
import { GetMyOneseoType } from 'types';

interface EditStep4PageProps {
  data: GetMyOneseoType;
  memberId: number;
}

const EditStep4Page = ({ data, memberId }: EditStep4PageProps) => {
  return <ScoreRegister data={data} type="admin" memberId={memberId} />;
};

export default EditStep4Page;
