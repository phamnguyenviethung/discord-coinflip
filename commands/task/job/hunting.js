const _ = require("underscore");
const { random } = require("chance-percent");
module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;

    if (user.inventory.tool.huntingrifle <= 0) {
      return interaction.reply(
        `Bạn không có súng săn. Hãy sử dụng \`/shopping\``
      );
    }

    const randomQuantity = _.random(2, 4);

    const options = [
      { value: "rabbit", percentage: 50 },
      { value: "tiger", percentage: 35 },
      { value: "empty", percentage: 5 },
      { value: "rhino", percentage: 10 },
    ];
    const randomItem = random(options);

    if (randomItem === "empty") {
      user.inventory.tool.huntingrifle -= 1;
      user.save();
      return interaction.reply(
        `Thật không may, **${interaction.user.username}** đã không săn được gì.`
      );
    }
    user.health.eat -= 10;
    user.health.drink -= 10;
    user.inventory.tool.huntingrifle -= 1;
    user.inventory.hunting[randomItem] += randomQuantity;
    user.save();

    return interaction.reply(
      `🧑‍🌾 **${interaction.user.username}** đã săn được **${randomQuantity} ${randomItem}**`
    );
  } catch (error) {
    console.log(error);
    return interaction.reply("hunting: Có lỗi !!");
  }
};
