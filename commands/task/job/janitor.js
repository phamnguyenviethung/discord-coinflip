const _ = require("underscore");
const { formatMoney } = require("../../../utils/format");
const { job } = require("../../../configs/jobConfig");

module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;
    const { salary, eat, drink, exp, level } = job.janitor;
    const randomQuantity = _.random(1, 3);
    user.health.eat -= eat;
    user.health.drink -= drink;
    user.money += salary;
    user.profile.exp.amount +=
      user.profile.exp.amount < exp && user.profile.exp.level === level ? 1 : 0;
    user.save();

    return interaction.reply(
      `👷 **${
        interaction.user.username
      }** đã dọn được **${randomQuantity} kg** rác và kiếm được ${formatMoney(
        salary
      )}`
    );
  } catch (error) {
    console.log(error);
    return interaction.reply("janitor: Có lỗi !!");
  }
};
