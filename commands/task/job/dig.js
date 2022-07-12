const _ = require("underscore");
const { random } = require("chance-percent");

module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;

    if (user.inventory.tool.shovel <= 0) {
      return interaction.reply(`Bạn không có xẻng. Hãy sử dụng \`/shopping\``);
    }

    const randomQuantity = _.random(3, 7);

    const options = [
      { value: "cloth", percentage: 30 },
      { value: "tape", percentage: 25 },
      { value: "plastic", percentage: 20 },
      { value: "iron", percentage: 14 },
      { value: "wire", percentage: 9 },
      { value: "empty", percentage: 2 },
    ];
    const randomItem = random(options);

    if (randomItem === "empty") {
      user.inventory.tool.shovel -= 1;
      user.save();
      return interaction.reply(
        `Thật không may, **${interaction.user.username}** đã không đào được gì.`
      );
    }

    user.health.eat -= 15;
    user.health.drink -= 15;
    user.inventory.tool.shovel -= 1;
    user.inventory.metal[randomItem] += randomQuantity;
    user.save();

    return interaction.reply(
      `🧑‍🌾 **${interaction.user.username}** đã đào được **${randomQuantity} ${randomItem}**`
    );
  } catch (error) {
    console.log(error);
    return interaction.reply("Dig: Có lỗi !!");
  }
};
