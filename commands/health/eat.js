const { category } = require("../../utils/category");
const choices = [];

category.fishing.forEach((item) =>
  choices.push({
    name: item,
    value: item,
  })
);

module.exports = {
  name: "eat",
  description: "Ăn gì đó đê!!!",
  type: "CHAT_INPUT",
  cooldown: 10,
  options: [
    {
      name: "food",
      description: "Bạn muốn ăn gì ?",
      type: "STRING",
      choices,
      required: true,
    },
    {
      name: "amount",
      description: "Số lượng bạn muốn ăn",
      type: "INTEGER",
      required: true,
      min_value: 1,
      max_value: 5,
    },
  ],

  run: async (client, interaction, user) => {
    try {
      const food = interaction.options.get("food").value;
      const amount = interaction.options.get("amount").value;

      if (user.health.eat >= 350) {
        return interaction.reply(` Bạn không đói.`);
      }

      const values = {
        perch: 10,
        carp: 20,
        phattom: 40,
        shark: 70,
      };

      if (
        user.inventory.fishing[food] <= 0 ||
        user.inventory.fishing[food] < amount
      ) {
        return interaction.reply("Bạn không có để ăn. Hãy đi câu");
      }

      user.inventory.fishing[food] -= amount;
      user.health.eat += values[food] * amount;
      user.save();

      return interaction.reply(
        `**${interaction.user.username}** vừa bú **${amount} ${food}** 🍖`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("eat: có lỗi");
    }
  },
};
