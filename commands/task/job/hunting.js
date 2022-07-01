const User = require("../../../app/models/User");
const _ = require("underscore");
const { random } = require("chance-percent");
const { formatMoney } = require("../../../utils/format");
module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;
    if (user.inventory.huntingrifle <= 0) {
      return interaction.reply(
        `Bạn không có súng săn. Hãy sử dụng code \`hrl\` để craft`
      );
    }
    const randomQuantity = _.random(2, 6);
    const randomMoney = _.random(1000, 5000);

    // Cloth - Plastic - Tape - Iron - Wire
    const options = [
      { value: "bird", percentage: 50 },
      { value: "rabbit", percentage: 35 },
      { value: "empty", percentage: 14 },
      { value: "tiger", percentage: 1 },
    ];
    const randomItem = random(options);

    if (randomItem === "empty") {
      return interaction.reply(
        `Thật không may, **${interaction.user.username}** đã không săn được gì.`
      );
    }

    user.health.eat -= 5;
    user.health.drink -= 5;
    user.money += randomMoney;

    user.inventory[randomItem] += randomQuantity;
    user.save();
    return interaction.reply(
      `🧑‍🌾 **${
        interaction.user.username
      }** đã săn được **${randomQuantity} ${randomItem}** và kiếm được **${formatMoney(
        randomMoney
      )}**`
    );
  } catch (error) {
    console.log(error);
    return interaction.reply("hunting: Có lỗi !!");
  }
};
