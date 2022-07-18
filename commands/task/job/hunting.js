const _ = require("underscore");
const { random } = require("chance-percent");
const { job } = require("../../../configs/jobConfig");
const { formatMoney } = require("../../../utils/format");
module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;
    const { eat, drink, salary, randomQuantity, percent, exp, level } =
      job.hunting;

    if (user.inventory.tool.huntingrifle <= 0) {
      return interaction.reply(
        `Bạn không có súng săn. Hãy sử dụng chế tạo bằng code hrl`
      );
    }

    const randomItem = random(percent);

    if (randomItem === "empty") {
      user.inventory.tool.huntingrifle -= 1;
      user.save();
      return interaction.reply(
        `Thật không may, **${interaction.user.username}** đã không săn được gì.`
      );
    }

    user.health.eat -= eat;
    user.health.drink -= drink;
    user.inventory.tool.huntingrifle -= 1;
    user.money += salary;
    user.inventory.hunting[randomItem] += randomQuantity;
    user.profile.exp.amount +=
      user.profile.exp.amount < exp && user.profile.exp.level === level ? 1 : 0;
    user.save();

    return interaction.reply(
      `🧑‍🌾 **${
        interaction.user.username
      }** đã săn được **${randomQuantity} ${randomItem}** và kiếm được ${formatMoney(
        salary
      )}`
    );
  } catch (error) {
    console.log(error);
    return interaction.reply("hunting: Có lỗi !!");
  }
};
