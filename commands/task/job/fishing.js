const _ = require("underscore");
const { random } = require("chance-percent");
const { formatMoney } = require("../../../utils/format");
module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;
    if (user.inventory.fishingrod <= 0) {
      return interaction.reply(
        `Bạn không có cần câu. Hãy sử dụng code \`fsr\` để craft`
      );
    }

    const randomQuantity = _.random(2, 6);
    const randomMoney = _.random(1000, 5000);

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
    user.money += randomMoney;
    user.inventory.fishingrod -= 1;

    user.inventory[randomItem] += randomQuantity;
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
