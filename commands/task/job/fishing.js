const _ = require("underscore");
const { random } = require("chance-percent");
const { job } = require("../../../configs/jobConfig");
const { formatMoney } = require("../../../utils/format");
module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;
    if (user.inventory.tool.fishingrod <= 0) {
      return interaction.reply(
        `Bạn không có cần câu. Hãy chế tạo bằng code fsr`
      );
    }
    const { eat, drink, salary, randomQuantity, percent, exp, level } =
      job.fishing;

    const randomItem = random(percent);

    if (randomItem === "empty") {
      user.health.eat -= eat;
      user.health.drink -= drink;
      user.inventory.tool.fishingrod -= 1;
      user.save();

      return interaction.reply(
        `Thật không may, **${interaction.user.username}** đã không đào được gì.`
      );
    }
    user.health.eat -= eat;
    user.health.drink -= drink;
    user.money += salary();
    user.inventory.tool.fishingrod -= 1;
    user.inventory.fishing[randomItem] += randomQuantity;
    user.profile.exp.amount +=
      user.profile.exp.amount < exp && user.profile.exp.level === level ? 1 : 0;

    user.save();

    return interaction.reply(
      `🧑‍🌾 **${
        interaction.user.username
      }** đã câu được **${randomQuantity} ${randomItem}** và kiếm được **${formatMoney(
        salary()
      )}**`
    );
  } catch (error) {
    console.log(error);
    return interaction.reply("fishing: Có lỗi !!");
  }
};
