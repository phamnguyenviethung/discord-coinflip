const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "wallet",
  description: "Xem số tiền bạn đang có!",
  type: "CHAT_INPUT",

  run: async (client, interaction) => {
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      const content = ` 💸 Cash: **${formatMoney(
        user.money
      )}**\n🏧 Bank: **${formatMoney(user.atm)}**`;

      return interaction.reply({
        content,
        ephemeral: false,
      });
    } catch (error) {
      console.log(error);
      return interaction.reply("Wallet: Có lỗi !!");
    }
  },
};
