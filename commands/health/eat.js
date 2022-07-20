const shopPrice = require("../../configs/shopConfig");

const choices = [];

["bread", "hamburger", "rice", "noodle"].forEach((item) =>
  choices.push({
    name: item,
    value: item,
  })
);

module.exports = {
  name: "eat",
  description: "Ăn gì đó đê!!!",
  type: "CHAT_INPUT",
  cooldown: 180,
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
      const max = 350;
      if (user.health.eat >= max) {
        return interaction.reply(` Bạn không đói.`);
      }

      if (user.item[food] <= 0 || user.item[food] < amount) {
        client.cooldowns.get("eat").delete(interaction.user.id);
        return interaction.reply("Bạn không có để ăn.");
      }
      const eatValue =
        user.health.eat + shopPrice[food].amount * amount > max
          ? max
          : user.health.eat + shopPrice[food].amount * amount;
      user.item[food] -= amount;
      user.health.eat = eatValue;
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
