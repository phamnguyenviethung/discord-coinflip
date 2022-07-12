const _ = require("underscore");
const { random } = require("chance-percent");

module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;

    if (user.inventory.tool.fishingrod <= 0) {
      return interaction.reply(
        `Bạn không có cần câu. Hãy sử dụng \`/shopping\``
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
    const randomQuantity = _.random(3, 6);

    const options = [
      { value: "perch", percentage: 35 },
      { value: "carp", percentage: 35 },
      { value: "phattom", percentage: 20 },
      { value: "empty", percentage: 9 },
      { value: "shark", percentage: 1 },
    ];
    const randomItem = random(options);

    if (randomItem === "empty") {
      user.inventory.tool.fishingrod -= 1;
      user.save();
      return interaction.reply(
        `Thật không may, **${interaction.user.username}** đã không câu được gì.`
      );
    }

    user.health.eat -= 6;
    user.health.drink -= 6;
    user.health.stress += 5;

    user.inventory.tool.fishingrod -= 1;
    user.inventory.fishing[randomItem] += randomQuantity;
    user.save();

    return interaction.reply(
      `🧑‍🌾 **${interaction.user.username}** đã câu được **${randomQuantity} ${randomItem}**`
    );
  } catch (error) {
    console.log(error);
    return interaction.reply("fishing: Có lỗi !!");
  }
};
