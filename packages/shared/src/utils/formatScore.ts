// 입력받은 점수에서 숫자만 추출합니다. 점수가 maxScore보다 클 경우, 뒷 자리를 제거합니다.

const formatScore = (score: string, maxScore?: number) => {
  maxScore = maxScore ?? 100;

  const onlyNumberScore = parseInt(
    score
      .split("")
      .filter((v) => !isNaN(parseInt(v)))
      .join(""),
  );

  let scoreResult;

  if (onlyNumberScore <= maxScore) {
    scoreResult = onlyNumberScore.toString();
  } else {
    scoreResult = onlyNumberScore.toString().slice(0, 1);
  }

  return scoreResult;
};

export default formatScore;
