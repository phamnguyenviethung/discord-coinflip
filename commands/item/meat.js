const { category } = require("../../utils/category");

const choices = [];
category.fishing.forEach((item) => {
  choices.push({
    name: item,
    value: item,
  });
});
module.exports = {
  name: "meat",
  description: "Chế biến động vật",
  type: "CHAT_INPUT",
  options: [
    {
      name: "type",
      description: "Loại",
      required: true,
      type: "STRING",
      choices,
    },
    {
      name: "amount",
      description: "Số lượng",
      required: true,
      type: "INTEGER",
      min_value: 1,
      max_value: 10,
    },
  ],

  run: async (client, interaction, user) => {
    const type = interaction.options.get("type").value;
    const amount = interaction.options.get("amount").value;

    const recipe = {
      perch: 1,
      carp: 5,
      phattom: 10,
      shark: 30,
    };

    try {
      if (
        user.inventory.fishing[type] < recipe[type] * amount ||
        user.inventory.fishing[type] <= 0
      ) {
        return interaction.reply(`Bạn không đủ nguyên liệu.`);
      }

      // gas check
      if (user.inventory.tool.gas < 1) {
        return interaction.reply("Cần tối thiểu là 1 bình gas để chế biến");
      }

      interaction.reply(
        `${interaction.user.username} đang chế biến **${amount} ${type}** 🍖`
      );
      await new Promise((resolve) => {
        setTimeout(resolve, 2500);
      });
      interaction.channel.send(`🍳🍳🍳`);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

      user.inventory.gas -= 1;
      user.inventory.fishimg[type] -= amount;
      user.inventory.food.meat += recipe[type] * amount;
      user.save();

      return interaction.channel.send(
        `Bạn đã chế biến **${type}** thành công `
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("cooking: có lỗi");
    }
  },
};
