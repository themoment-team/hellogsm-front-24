import { MyPage } from 'client/pageContainer';

interface MyInfoProps {
  name: string;
  number: number;
  admission: string;
  departments: string[];
}

const MokData: MyInfoProps = {
  name: '김재균',
  number: 128,
  admission: '일반전형',
  departments: ['SW 개발과', '스마트 IoT과', '인공지능과'],
};

export default function Home() {
  return <MyPage {...MokData} />;
}
