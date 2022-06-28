module.exports.formatMoney = (money) => {
  return money.toFixed(0).toLocaleString("en-US") + "$";
};
