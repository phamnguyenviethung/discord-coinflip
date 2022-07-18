const { random } = require("chance-percent");
const { job } = require("../../../configs/jobConfig");
const { formatMoney } = require("../../../utils/format");

module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;
    const { eat, drink, salary, randomQuantity, percent, exp, level } = job.dig;
    const basicSalary = _.random(800, 900) * 1.8;

    const randomItem = random(percent);

    if (randomItem === "empty") {
      return interaction.reply(
        `Thật không may, **${interaction.user.username}** đã không đào được gì.`
      );
    }

    user.health.eat -= eat;
    user.health.drink -= drink;
    user.inventory.metal[randomItem] += randomQuantity;
    user.money += basicSalary;
    user.profile.exp.amount +=
      user.profile.exp.amount < exp && user.profile.exp.level === level ? 1 : 0;
    user.save();

    return interaction.reply(
      `🧑‍🌾 **${
        interaction.user.username
      }** đã đào được **${randomQuantity} ${randomItem}** và kiếm được ${formatMoney(
        basicSalary
      )}`
    );
  } catch (error) {
    console.log(error);
    return interaction.reply("Dig: Có lỗi !!");
  }
};
