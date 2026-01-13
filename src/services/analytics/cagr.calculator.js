function calculateCAGR(startNAV, endNAV, years) {
  if (!startNAV || !endNAV || years <= 0) return null;

  return Number(
    (
      Math.pow(endNAV / startNAV, 1 / years) - 1
    ) * 100
  ).toFixed(2);
}

module.exports = {
  calculateCAGR
};
