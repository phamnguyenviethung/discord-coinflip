const Craft = require("../../app/models/Craft");
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
  name: "cooking",
  description: "Nấu ăn",
  type: "CHAT_INPUT",
  options: [
    {
      name: "food",
      description: "Thức ăn cần nấu (ít nhất có 5 con)",
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

      if (user.inventory[food] < 5) {
        return interaction.reply("Cần tối thiểu là 5 con để chế biến");
      }
      if (user.inventory.gas < 2) {
        return interaction.reply("Cần tối thiểu là 2 bình gas để chế biến");
      }

      interaction.reply(`${interaction.user.username} đang nấu **${food}** 🍖`);
      await new Promise((resolve) => {
        setTimeout(resolve, 2500);
      });
      interaction.channel.send(`🍳🍳🍳`);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

      user.inventory[food] -= 5;
      user.inventory.gas -= 2;
      user.inventory.meat += 20;
      user.save();

      return interaction.channel.send(
        `Bạn đã chế biến **${food}** thành công `
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("cooking: có lỗi");
    }
  },
};
