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
      choices: choicesGenerator(["keyboard", "mouse", "case"]),
    },
    {
      name: "amount",
      description: "Số lượng muốn bán",
      type: "INTEGER",
      required: true,
      min_value: 1,
    },
  ],
  run: async (client, interaction, user) => {
    try {
      const type = interaction.options.get("type").value;
      const amount = interaction.options.get("amount").value;

      if (user.inventory.old[type] <= 0 || user.inventory.old[type] < amount) {
        return interaction.reply("Bạn không có để bán");
      }

      const price = {
        mouse: 1000,
        keyboard: 3000,
        case: 10000,
      };

      user.inventory.old[type] -= amount;
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
