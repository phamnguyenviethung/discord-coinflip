const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "eat",
  description: "Ăn gì đó đê!!!",
  type: "CHAT_INPUT",

  run: async (client, interaction) => {
    const price = 200;
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      if (user.money < price) {
        return interaction.reply(` Bạn không đủ tiền! =))`);
      }
      user.money -= price;
      user.health.eat += 35;
      user.save();

      return interaction.reply(
        `${interaction.user.username} vừa ăn 1 **tô phở** giá \`${formatMoney(
          price
        )}\``
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("eat: có lỗi");
    }
  },
};
