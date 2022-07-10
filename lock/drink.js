const User = require("../app/models/User");
const { formatMoney } = require("../utils/format");

module.exports = {
  name: "drink",
  description: "Uống gì đó đê!!!",
  type: "CHAT_INPUT",
  cooldown: 90,

  run: async (client, interaction) => {
    const price = 80;
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      if (user.money < price) {
        return interaction.reply(` Bạn không đủ tiền! =))`);
      }
      if (user.health.drink >= 19999) {
        return interaction.reply(` Bạn không khát nước.`);
      }

      user.money -= price;
      user.health.drink += 5;
      user.save();

      return interaction.reply(
        `${
          interaction.user.username
        } vừa uống  1 chai **coca** giá \`${formatMoney(price)}\``
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("drink: có lỗi");
    }
  },
};
