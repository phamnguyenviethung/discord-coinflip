const _ = require("underscore");
const { random } = require("chance-percent");
const { formatMoney } = require("../../../utils/format");
const User = require("../../../app/models/User");

module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;

    if (user.inventory.fishingrod <= 0) {
      return interaction.reply(
        `Bạn không có cần câu. Hãy sử dụng code \`fsr\` để craft`
      );
    }
    const limit = {
      eat: 70,
      drink: 60,
    };

    if (user.health.eat < limit.eat || user.health.drink < limit.drink) {
      return interaction.reply(
        `Bạn đã kiệt sức. Để tiếp tục làm việc, bạn cần có ít nhất **${limit.eat} eat và ${limit.drink} drink**`
      );
    }
    const randomQuantity = _.random(4, 10);
    const randomMoney = _.random(7000, 12000);

    // Cloth - Plastic - Tape - Iron - Wire
    const options = [
      { value: "perch", percentage: 40 },
      { value: "carp", percentage: 30 },
      { value: "phattom", percentage: 19 },
      { value: "empty", percentage: 10 },
      { value: "shark", percentage: 1 },
    ];
    const randomItem = random(options);

    if (randomItem === "empty") {
      return interaction.reply(
        `Thật không may, **${interaction.user.username}** đã không câu được gì.`
      );
    }

    user.health.eat -= 5;
    user.health.drink -= 5;
    user.inventory.fishingrod -= 1;
    user.inventory[randomItem] += randomQuantity;
    user.money += randomMoney;
    user.save();

    return interaction.reply(
      `🧑‍🌾 **${
        interaction.user.username
      }** đã câu được **${randomQuantity} ${randomItem}** và kiếm được **${formatMoney(
        randomMoney
      )}**`
    );
  } catch (error) {
    console.log(error);
    return interaction.reply("fishing: Có lỗi !!");
  }
};
