const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "withdraw",
  description: "Rút tiền",
  type: "CHAT_INPUT",
  options: [
    {
      name: "amount",
      description: "Số tiền bạn muốn rút",
      type: "INTEGER",
      required: true,
      min_value: 1,
    },
  ],
  run: async (client, interaction) => {
    const { value } = interaction.options.get("amount");
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");

      if (user.atm < value || user.atm <= 0) {
        return interaction.reply("Bạn không đủ tiền");
      }
      const percentage = value - (value * 98.5) / 100;

      user.atm -= value;
      user.money += value - percentage;
      user.save();

      return interaction.reply(
        `💸 Bạn đã rút **${formatMoney(
          value
        )}** ra khỏi tài khoản.Phí giao dịch **${formatMoney(percentage)}**`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Withdraw: Có lỗi !!");
    }
  },
};
