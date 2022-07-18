const _ = require("underscore");
const { job } = require("../../../configs/jobConfig");
const { formatMoney } = require("../../../utils/format");
const { faker } = require("@faker-js/faker");

module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;
    const { eat, drink, salary, exp, level } = job.chef;

    const randomName = faker.company.companyName();

    user.health.eat -= eat;
    user.health.drink -= drink;
    user.money += salary();
    user.profile.exp.amount +=
      user.profile.exp.amount < exp && user.profile.exp.level === level ? 1 : 0;
    user.save();

    return interaction.reply(
      `🧑‍🌾 **${
        interaction.user.username
      }** nấu ăn cho nhà hàng **${randomName}** và kiếm được **${formatMoney(
        salary()
      )}** `
    );
  } catch (error) {
    console.log(error);
    return interaction.reply("chef: Có lỗi !!");
  }
};
