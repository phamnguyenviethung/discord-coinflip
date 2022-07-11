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
  cooldown: 7,
  options: [
    {
      name: "food",
      description: "Chọn món",
      required: true,
      type: "STRING",
      choices,
    },
  ],
  run: async (client, interaction, user) => {
    const food = interaction.options.get("food").value;

    const values = {
      bread: 10,
      rice: 30,
      noodle: 50,
    };
    try {
      if (user.health.eat >= 350) {
        return interaction.reply(` Bạn không đói.`);
      }

      if (user.inventory.food[food] <= 0) {
        return interaction.reply(`Bạn không có để ăn`);
      }

      user.inventory.food[food] -= 1;
      user.health.eat += values[food];
      user.save();

      return interaction.reply(
        `**${interaction.user.username}** vừa bú **${food}** 🍖`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("eat: có lỗi");
    }
  },
};
