module.exports.formatMoney = (money) => {
  return `**${money.toLocaleString("en-US")}€**`;
};
