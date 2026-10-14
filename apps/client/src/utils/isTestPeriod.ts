// 상용 환경에서 테스트를 진행할 때 true로 설정해 테스트 안내 모달을 노출한다.
const isTestPeriod = process.env.NEXT_PUBLIC_IS_TEST_PERIOD === 'true';

export default isTestPeriod;
