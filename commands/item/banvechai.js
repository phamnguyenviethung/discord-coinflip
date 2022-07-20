const _ = require("underscore");
const { formatMoney } = require("../../utils/format");
const { choicesGenerator } = require("../../utils/choicesGenerator");
module.exports = {
  name: "banvechai",
  description: "Bán ve chai",
  type: "CHAT_INPUT",
  cooldown: 10,
  options: [
    {
      name: "type",
      description: "Chọn thứ cần bán",
      required: true,
      type: "STRING",
      choices: choicesGenerator(["cloth", "tape", "plastic", "iron", "wire"]),
    },
    {
      name: "amount",
      description: "Số lượng muốn bán",
      type: "INTEGER",
      required: true,
      min_value: 80,
    },
  ],
  run: async (client, interaction, user) => {
    try {
      const type = interaction.options.get("type").value;
      const amount = interaction.options.get("amount").value;

      if (
        user.inventory.metal[type] <= 0 ||
        user.inventory.metal[type] < amount
      ) {
        return interaction.reply("Bạn không có để bán");
      }

      const price = {
        cloth: 8000,
        tape: 8000,
        plastic: 20000,
        iron: 60000,
        wire: 100000,
      };

      user.inventory.metal[type] -= amount;
      user.money += price[type] * amount;
      user.save();

      await new Promise((resolve) => {
        setTimeout(resolve, 1200);
      });
      return await interaction.reply(
        ` Bạn đã bán **${amount + " " + type}** với giá **${formatMoney(
          price[type] * amount
        )}**`
      );
    } catch (error) {
      console.log(error);
      return interaction.channel.send("banvechai: Có lỗi");
    }
  },
};
