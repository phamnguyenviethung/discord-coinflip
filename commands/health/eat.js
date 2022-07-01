const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");
const { category } = require("../../utils/category");

const choices = [];

category.eat.forEach((item) => {
  choices.push({
    name: item,
    value: item,
  });
});

module.exports = {
  name: "eat",
  description: "Ăn gì đó đê!!!",
  type: "CHAT_INPUT",
  options: [
    {
      name: "food",
      description: "Chọn thứ cần ăn",
      required: true,
      type: "STRING",
      choices,
    },
  ],

  run: async (client, interaction) => {
    const food = interaction.options.get("food").value;

    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      if (user.inventory[food] <= 0) {
        return interaction.reply(` Bạn không có để ăn. Hãy đi săn!`);
      }

      if (user.health.eat >= 250) {
        return interaction.reply(` Bạn không đói.`);
      }
      interaction.reply(`${interaction.user.username} đang nấu **${food}** 🍖`);
      await new Promise((resolve) => {
        setTimeout(resolve, 2500);
      });
      interaction.channel.send(`🍳🍳🍳`);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      user.inventory[food] -= 2;
      user.health.eat += 40;
      user.save();

      return await interaction.channel.send(
        `${interaction.user.username} vừa ăn **${food}** 🍖`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("eat: có lỗi");
    }
  },
};
