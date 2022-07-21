const { random } = require("chance-percent");
const { job } = require("../../../configs/jobConfig");
const { formatMoney } = require("../../../utils/format");

module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;
    const { eat, drink, randomQuantity, salary, percent, exp, level } =
      job.farm;

    const randomItem = random(percent);

    user.health.eat -= eat;
    user.health.drink -= drink;
    user.inventory.vegatable[randomItem] += randomQuantity();
    user.profile.exp.amount +=
      user.profile.exp.amount < exp && user.profile.exp.level === level ? 1 : 0;
    user.money += salary();
    user.save();

    return interaction.reply(
      `🧑‍🌾 **${
        interaction.user.username
      }** đã thu hoạch được **${randomQuantity()} ${randomItem}** và kiếm được **${formatMoney(
        salary()
      )}**`
    );
  } catch (error) {
    console.log(error);
    return interaction.reply("farm: Có lỗi !!");
  }
};
