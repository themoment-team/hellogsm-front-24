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
