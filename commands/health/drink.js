const shopPrice = require("../../configs/shopConfig");
const choices = [];

["sting", "coffee", "beer"].forEach((item) =>
  choices.push({
    name: item,
    value: item,
  })
);

module.exports = {
  name: "drink",
  description: "uống gì đó đê!!!",
  type: "CHAT_INPUT",
  cooldown: 180,
  options: [
    {
      name: "drink",
      description: "Bạn muốn uống gì ?",
      type: "STRING",
      choices,
      required: true,
    },
    {
      name: "amount",
      description: "Số lượng bạn muốn uống",
      type: "INTEGER",
      required: true,
      min_value: 1,
      max_value: 5,
    },
  ],

  run: async (client, interaction, user) => {
    try {
      const drink = interaction.options.get("drink").value;
      const amount = interaction.options.get("amount").value;
      const max = 350;
      if (user.health.drink >= max) {
        return interaction.reply(` Bạn không khát...`);
      }

      if (user.item[drink] <= 0 || user.item[drink] < amount) {
        return interaction.reply("Bạn không đủ nước uống. Hãy đi mua");
      }

      const drinkValue =
        user.health.drink + shopPrice[drink].amount * amount > max
          ? max
          : user.health.drink + shopPrice[drink].amount * amount;

      user.item[drink] -= amount;
      user.health.drink = drinkValue;
      user.save();

      return interaction.reply(
        `**${interaction.user.username}** vừa uống ${amount} ${drink} 🍺`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("drink: có lỗi");
    }
  },
};
