import { StepsContainer } from 'shared';

interface Props {
  param: string;
}

const StepsPage = ({ param }: Props) => <StepsContainer param={param} />;

export default StepsPage;
