const User = require("../../../app/models/User");

const _ = require("underscore");
const { random } = require("chance-percent");
const { formatMoney } = require("../../../utils/format");

module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;
    if (user.inventory.shovel <= 0) {
      return interaction.reply(
        `Bạn không có xẻng. Hãy sử dụng code \`svl\` để craft`
      );
    }
    const randomQuantity = _.random(3, 8);
    const randomMoney = _.random(1000, 5000);

    // Cloth - Plastic - Tape - Iron - Wire
    const options = [
      { value: "cloth", percentage: 34 },
      { value: "plastic", percentage: 25 },
      { value: "tape", percentage: 20 },
      { value: "iron", percentage: 15 },
      { value: "empty", percentage: 5 },
      { value: "wire", percentage: 1 },
    ];
    const randomItem = random(options);

    if (randomItem === "empty") {
      return interaction.reply(
        `Thật không may, **${interaction.user.username}** đã không đào được gì.`
      );
    }

    user.health.eat -= 10;
    user.health.drink -= 10;
    user.money += randomMoney;
    user.inventory.shovel -= 1;

    user.inventory[randomItem] += randomQuantity;
    user.save();
    return interaction.reply(
      `🧑‍🌾 **${
        interaction.user.username
      }** đã đào được **${randomQuantity} ${randomItem}** và kiếm được **${formatMoney(
        randomMoney
      )}**`
    );
  } catch (error) {
    console.log(error);
    return interaction.reply("Dig: Có lỗi !!");
  }
};
