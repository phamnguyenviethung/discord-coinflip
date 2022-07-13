const _ = require("underscore");
const { random } = require("chance-percent");

module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;

    if (user.inventory.tool.shovel <= 0) {
      return interaction.reply(`Bạn không có xẻng. Hãy sử dụng \`/shopping\``);
    }

    const randomQuantity = _.random(5, 12);

    const options = [
      { value: "tape", percentage: 25 },
      { value: "cloth", percentage: 18 },
      { value: "plastic", percentage: 20 },
      { value: "iron", percentage: 16 },
      { value: "empty", percentage: 11 },
      { value: "wire", percentage: 10 },
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
    user.health.drink -= 20;
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
