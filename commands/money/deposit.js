const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "deposit",
  description: "Nạp tiền",
  type: "CHAT_INPUT",
  options: [
    {
      name: "amount",
      description: "Số tiền bạn muốn nạp",
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

      if (user.money < value || user.money <= 0) {
        return interaction.reply("Bạn không đủ tiền");
      }
      user.money -= value;
      user.atm += value;
      user.save();

      return interaction.reply(
        `💸 Bạn đã nạp **${formatMoney(value)}** vào  tài khoản.`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Deposit: Có lỗi !!");
    }
  },
};
