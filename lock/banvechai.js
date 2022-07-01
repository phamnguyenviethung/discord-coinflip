const User = require("../app/models/User");
const _ = require("underscore");
const { formatMoney } = require("../utils/format");
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
      choices: [
        {
          name: "Plastic",
          value: "plastic",
        },
        {
          name: "Iron",
          value: "iron",
        },
      ],
    },
    {
      name: "amount",
      description: "Số lượng muốn bán",
      type: "INTEGER",
      required: true,
      min_value: 1,
    },
  ],
  run: async (client, interaction) => {
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.channel.send("Bạn chưa đăng ký");
      const type = interaction.options.get("type").value;
      const amount = interaction.options.get("amount").value;

      const { plastic, iron } = user.inventory;

      if (user.inventory[type] <= 0) {
        return interaction.reply("Bạn không có để bán");
      }

      const price = {
        iron: 250,
        plastic: 200,
      };

      const sellprice =
        type === "plastic" ? price.plastic * amount : price.iron * amount;

      user.inventory[type] -= amount;
      user.money += sellprice;
      user.save();

      await new Promise((resolve) => {
        setTimeout(resolve, 1200);
      });
      return await interaction.reply(
        ` Bạn đã bán **${amount + " " + type}** được **${formatMoney(
          sellprice
        )}**`
      );
    } catch (error) {
      console.log(error);
      return interaction.channel.send("banvechai: Có lỗi");
    }
  },
};
