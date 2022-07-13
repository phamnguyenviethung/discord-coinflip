const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "drink",
  description: "Uống Sting",
  type: "CHAT_INPUT",
  cooldown: 30,
  options: [
    {
      name: "amount",
      description: "Số lượng bạn muốn uống",
      type: "INTEGER",
      required: true,
      min_value: 1,
      max_value: 3,
    },
  ],

  run: async (client, interaction, user) => {
    const amount = interaction.options.get("amount").value;
    const price = 5000 * amount;
    try {
      if (user.health.drink >= 350) {
        return interaction.reply(` Bạn không khát nước.`);
      }
      if (user.money <= 0 || user.money < price) {
        return interaction.reply(` Bạn không đủ tiền`);
      }

      user.money -= price;
      user.health.drink += 40 * amount;

      user.save();

      return interaction.reply(
        `${
          interaction.user.username
        } vừa uống  ${amount} chai **sting** giá **${formatMoney(price)}**`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("sting: có lỗi");
    }
  },
};
