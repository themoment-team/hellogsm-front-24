import { MyTestResultType } from 'types';

import { Footer, Section5 } from 'client/components';
import { Section1, Section2, Section3, Section4 } from 'client/components';

interface MainPageProps {
  resultInfo: MyTestResultType | undefined;
}

const MainPage = ({ resultInfo }: MainPageProps) => {
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Footer />
    </>
  );
};

export default MainPage;
