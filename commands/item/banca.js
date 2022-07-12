const User = require("../../app/models/User");
const _ = require("underscore");
const { formatMoney } = require("../../utils/format");
const { category } = require("../../utils/category");
const choices = [];
category.fishing.forEach((item) => {
  choices.push({
    name: item,
    value: item,
  });
});

module.exports = {
  name: "banca",
  description: "Bán cá",
  type: "CHAT_INPUT",
  cooldown: 10,
  options: [
    {
      name: "type",
      description: "Chọn thứ cần bán",
      required: true,
      type: "STRING",
      choices,
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

      if (
        user.inventory.fishing[type] <= 0 ||
        user.inventory.fishing[type] < amount
      ) {
        return interaction.reply("Bạn không có để bán");
      }

      const price = {
        perch: 3000,
        carp: 5000,
        phattom: 15000,
        shark: 100000,
      };

      user.inventory.fishing[type] -= amount;
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
