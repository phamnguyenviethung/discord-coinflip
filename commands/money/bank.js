const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "bank",
  description: "Chuyển tiền cho người khác!",
  type: "CHAT_INPUT",
  options: [
    {
      name: "user",
      description: "Người bạn muốn chuyền tiền",
      type: "USER",
      required: true,
    },
    {
      name: "amount",
      description: "Số tiền bạn muốn chuyền",
      type: "INTEGER",
      required: true,
      min_value: 0,
    },
  ],
  run: async (client, interaction) => {
    const { value } = interaction.options.get("amount");
    const payeeInfo = interaction.options.getUser("user");
    const { id, username } = payeeInfo;
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      const payee = await User.findOne({ id });
      if (!payee)
        return interaction.reply("Người nhận không đúng hoặc chưa đăng ký");
      if (user.id === payee.id) {
        return interaction.reply("Bạn không thể dùng lên chính mình");
      }
      if (user.atm <= 0 || user.atm < value) {
        return interaction.reply("Bạn không đủ tiền! :(");
      }

      const percentage = value - (value * 98.5) / 100;
      user.atm -= value;
      payee.atm += value - percentage;
      user.save();
      payee.save();

      payeeInfo.send(
        `Bạn nhận được ${formatMoney(value)} từ **${
          interaction.user.username
        }**!. Phí giao dịch (người nhận trả): ${formatMoney(percentage)}`
      );
      return interaction.reply(
        `🤑 **${interaction.user.username}** đã chuyển **${formatMoney(
          value
        )}** cho **${username}**. Phí giao dịch (người nhận trả): ${formatMoney(
          percentage
        )}`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Give: Có lỗi !!");
    }
  },
};
