const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "cash",
  description: "Xem số tiền bạn đang có!",
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");

      return interaction.reply(
        ` Số coin ${interaction.user.username} đang có là: **${formatMoney(
          user.money
        )}** `
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Cash: Có lỗi !!");
    }
  },
};
