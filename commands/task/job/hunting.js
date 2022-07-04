const User = require("../../../app/models/User");
const _ = require("underscore");
const { random } = require("chance-percent");
const { formatMoney } = require("../../../utils/format");
module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;
    const require = {
      sting: 2,
    };
    if (user.inventory.huntingrifle <= 0) {
      return interaction.reply(
        `Bạn không có súng săn. Hãy sử dụng code \`hrl\` để craft`
      );
    }

    const randomQuantity = _.random(4, 8);
    const randomMoney = _.random(9000, 14000);

    const options = [
      { value: "bird", percentage: 40 },
      { value: "rabbit", percentage: 35 },
      { value: "empty", percentage: 14 },
      { value: "tiger", percentage: 10 },
      { value: "rhino", percentage: 1 },
    ];
    const randomItem = random(options);

    if (randomItem === "empty") {
      return interaction.reply(
        `Thật không may, **${interaction.user.username}** đã không săn được gì.`
      );
    }
    user.health.eat -= 8;
    user.health.drink -= 8;
    user.inventory.huntingrifle -= 1;
    user.inventory[randomItem] += randomQuantity;
    user.money += randomMoney;
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
