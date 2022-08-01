const shopPrice = require("../../configs/shopConfig");

const choices = [];

["cigarette", "drug"].forEach((item) =>
  choices.push({
    name: item,
    value: item,
  })
);

module.exports = {
  name: "smoke",
  description: "Hút đi",
  type: "CHAT_INPUT",
  cooldown: 3,
  options: [
    {
      name: "item",
      description: "Bạn muốn hút gì ?",
      type: "STRING",
      choices,
      required: true,
    },
  ],

  run: async (client, interaction, user) => {
    try {
      const itemName = interaction.options.get("item").value;

      if (user.item[itemName] <= 0) {
        return interaction.reply("Bạn không có để hút.");
      }

      const value = itemName === "cigarette" ? 15 : 70;
      const newStressValue =
        user.health.stress - value < 0 ? 0 : user.health.stress - value;

      user.item[itemName] -= 1;
      user.health.stress = newStressValue;
      user.save();

      return interaction.reply(
        `🚬 **${interaction.user.username}** vừa làm **1 hơi ${itemName}**`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("eat: có lỗi");
    }
  },
};
